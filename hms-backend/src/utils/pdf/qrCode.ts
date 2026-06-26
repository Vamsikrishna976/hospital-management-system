import QRCode from "qrcode";

export const generateQRCode = async (text: string): Promise<Buffer> => {
  return await QRCode.toBuffer(text, {
    type: "png",
    width: 120,
    margin: 1,
    color: {
      dark: "#1E3A8A",
      light: "#FFFFFF",
    },
  });
};
