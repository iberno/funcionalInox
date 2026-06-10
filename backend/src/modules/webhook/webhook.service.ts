import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WebhookService {
  private readonly logger = new Logger(WebhookService.name);

  constructor(private config: ConfigService) {}

  async send(type: 'orcamento' | 'contato', data: Record<string, any>) {
    const url = type === 'orcamento'
      ? this.config.get<string>('N8N_WEBHOOK_ORCAMENTO')
      : this.config.get<string>('N8N_WEBHOOK_CONTATO');

    if (!url) {
      this.logger.warn(`N8N webhook URL not configured for ${type}`);
      return;
    }

    try {
      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, ...data, timestamp: new Date().toISOString() }),
      });
      this.logger.log(`Webhook sent for ${type}`);
    } catch (err) {
      this.logger.error(`Failed to send webhook for ${type}:`, err);
    }
  }
}
