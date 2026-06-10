import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { execSync } from 'child_process';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Admin - QR Code')
@Controller('admin')
export class AdminQrController {
  @Post('gerar-qr')
  @HttpCode(200)
  async gerarQr() {
    try {
      execSync(
        `curl -sk -X POST http://localhost:8080/instance/connect \
          -H "apikey: 1c1ea80b8b13895c8f145f9d72fc1b99958f6179f5c504d8e4896b1ebae55d19" \
          -H "Content-Type: application/json" \
          -d '{"name":"funcional-inox"}'`,
        { timeout: 15000 },
      );
      await new Promise((r) => setTimeout(r, 3000));
      const qrData = execSync(
        `docker logs n8n-evolution-go-1 2>&1 | grep -A1 "QR code:" | grep "2@" | tail -1 | xargs`,
        { timeout: 5000 },
      ).toString().trim();
      if (!qrData) return { ok: false, erro: 'QR code nao gerado' };
      execSync(`qrencode -s 10 -o /root/sitesOn/funcional/backend/uploads/qr.png "${qrData}"`, { timeout: 5000 });
      return { ok: true };
    } catch (e: any) {
      return { ok: false, erro: e.message || 'Erro ao gerar QR' };
    }
  }
}
