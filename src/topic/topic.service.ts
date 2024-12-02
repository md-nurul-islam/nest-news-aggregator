import { Injectable } from '@nestjs/common';
import * as natural from 'natural';

@Injectable()
export class TopicsService {
  private tokenizer = new natural.WordTokenizer();

  extractKeywords(text: string, topN = 5) {
    const words = this.tokenizer.tokenize(text.toLowerCase());
    const frequency = {};

    words.forEach((word) => {
      if (!natural.stopwords.includes(word)) {
        frequency[word] = (frequency[word] || 0) + 1;
      }
    });

    return JSON.stringify(
      Object.entries(frequency)
        .slice(0, topN)
        .map(([word]) => word)
    );
  }
}
