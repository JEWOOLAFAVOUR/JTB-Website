import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from "@/components/ui/button";
import { Download, Copy, Check } from 'lucide-react';
import { sendToast } from '../utilis';

const QRCodeGenerator = ({ stickerNumber }) => {
    const [copied, setCopied] = React.useState(false);
    const baseUrl = 'http://localhost:5173/verify-sirts';
    const verificationUrl = `${baseUrl}?sticker-number=${stickerNumber}`;

    const downloadQRCodeAsPNG = () => {
        const svg = document.getElementById('qr-code');
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const data = (new XMLSerializer()).serializeToString(svg);
        const DOMURL = window.URL || window.webkitURL || window;

        const img = new Image();
        const svgBlob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
        const url = DOMURL.createObjectURL(svgBlob);

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            DOMURL.revokeObjectURL(url);

            const pngUrl = canvas.toDataURL('image/png');
            const downloadLink = document.createElement('a');
            downloadLink.href = pngUrl;
            downloadLink.download = `sticker-${stickerNumber}.png`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            sendToast('success', "QR Code downloaded successfully!")
        };
        img.src = url;
    };

    const downloadQRCodeAsSVG = () => {
        const svg = document.getElementById('qr-code');
        const data = (new XMLSerializer()).serializeToString(svg);
        const svgBlob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(svgBlob);
        downloadLink.download = `sticker-${stickerNumber}.svg`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        sendToast('success', 'QR Code downloaded as SVG!')

    };

    const copyUrl = () => {
        navigator.clipboard.writeText(verificationUrl);
        setCopied(true);
        sendToast('success', "Verification URL copied to clipboard!")
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col items-center space-y-4 p-4 bg-white rounded-lg border">
            <QRCodeSVG
                id="qr-code"
                value={verificationUrl}
                size={200}
                level="H"
                includeMargin={true}
                fgColor="#000000"
                className="rounded-lg"
            />
            <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex gap-2">
                    <Button
                        onClick={downloadQRCodeAsPNG}
                        className="flex items-center gap-2"
                    >
                        <Download size={16} />
                        PNG
                    </Button>
                    {/* <Button
                        onClick={downloadQRCodeAsSVG}
                        variant="outline"
                        className="flex items-center gap-2"
                    >
                        <Download size={16} />
                        SVG
                    </Button> */}
                </div>
                <Button
                    variant="outline"
                    onClick={copyUrl}
                    className="flex items-center gap-2"
                >
                    {copied ? (
                        <>
                            <Check size={16} />
                            Copied!
                        </>
                    ) : (
                        <>
                            <Copy size={16} />
                            Copy URL
                        </>
                    )}
                </Button>
            </div>
            <div className="text-sm text-gray-500 text-center">
                <p>Verification URL:</p>
                <p className="font-mono break-all">{verificationUrl}</p>
            </div>
        </div>
    );
};

export default QRCodeGenerator;

