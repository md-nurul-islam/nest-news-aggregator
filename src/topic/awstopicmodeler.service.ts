import {
    ComprehendClient,
    DetectDominantLanguageCommand,
    BatchDetectDominantLanguageCommand,
    StartTopicsDetectionJobCommand,
    BatchDetectDominantLanguageCommandOutput,
    JobStatus,
    StartTopicsDetectionJobCommandInput
} from "@aws-sdk/client-comprehend";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Body, Param } from "@nestjs/common";

export class AWSTopicModeler {
    private comprehendClient: ComprehendClient;
    private S3Client: S3Client;

    constructor(region = process.env.AWS_REGION) {
        this.comprehendClient = new ComprehendClient({ region });
        this.S3Client = new S3Client({ region });
    }

    async detectLanguage(documents): Promise<any[]> {
        try {
            const params = {
                TextList: documents
            };

            const command = new BatchDetectDominantLanguageCommand(params);
            const response = await this.comprehendClient.send(command);

            return response.ResultList.map((result, index) => ({
                documentIndex: index,
                languageCode: result.Languages[0].LanguageCode,
                confidence: result.Languages[0].Score,
            }));
        } catch (err) {
            console.error('Language detection failed: ', err);
        }
    }

    async uploadDocumentsToS3(documents, bucketName = process.env.AWS_BUCKET_NAME, prefix = process.env.AWS_TOPIC_MODELING_INPUT): Promise<any[]> {
        const uploadCommands = documents.map(async (document, index) => {
            const documentKey = `${prefix}document-${index}.txt`;
            const params = {
                Bucket: bucketName,
                Key: documentKey,
                Body: document,
            };

            try {
                const command = new PutObjectCommand(params);
                await this.S3Client.send(command);

                return documentKey;
            } catch (error) {
                console.error('Document upload failed: ', error);
            }
        });

        return Promise.all(uploadCommands);
    }

    async detectTopics(bucketName = process.env.AWS_BUCKET_NAME) {
        try {
            const params = {
                InputDataConfig: {
                    S3Uri: `s3://${bucketName}${process.env.AWS_TOPIC_MODELING_INPUT}`,
                },
                OutputDataConfig: {
                    S3Uri: `s3://${bucketName}${process.env.AWS_TOPIC_MODELING_OUTPUT}`
                },
                DataAccessRoleArn: process.env.AWS_COMPREHEND_ROLE_ARN,
                NumberOfTopics: 10,
            };

            const command = new StartTopicsDetectionJobCommand(params);
            const response = await this.comprehendClient.send(command);

            return {
                jobId: response.JobId,
                jobARN: response.JobArn,
                jobStatus: response.JobStatus
            };
        } catch (error) {
            console.error('Topic Modeling Error:', error);
        }
    }

    async performTopicModeling(documents) {
        try {
            await this.detectLanguage(documents);
            await this.uploadDocumentsToS3(documents);
            await this.detectTopics();

            console.log(`Topic modeling initiated and list will be available in s3://${process.env.AWS_BUCKET_NAME}${process.env.AWS_TOPIC_MODELING_OUTPUT}`);
        } catch (error) {
            console.error('Topic Modeling failed :', error);
        }
    }
}
