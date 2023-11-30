import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';

@Injectable()
export class JsonService {
  async readJson(filePath: string): Promise<any> {
    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(fileContent);
    } catch (error) {
      throw new Error(`Error reading JSON file: ${error.message}`);
    }
  }

  async writeJson(filePath: string, data: any): Promise<void> {
    try {
      const jsonContent = JSON.stringify(data, null, 2);
      await fs.writeFile(filePath, jsonContent, 'utf-8');
    } catch (error) {
      throw new Error(`Error writing JSON file: ${error.message}`);
    }
  }
}
