package dev.jesx.tomodachi.utils;

import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.imageio.stream.ImageOutputStream;

public class ImageUtil {
    public static byte[] resizeAndCompressImage(byte[] imageData, int targetWidth, int targetHeight, float quality) throws IOException {
        BufferedImage originalImage = ImageIO.read(new ByteArrayInputStream(imageData));
        
        // Resize the image
        BufferedImage resizedImage = new BufferedImage(targetWidth, targetHeight, BufferedImage.TYPE_INT_RGB);
        Graphics2D g = resizedImage.createGraphics();
        g.drawImage(originalImage, 0, 0, targetWidth, targetHeight, null);
        g.dispose();

        // Compress the image
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        ImageOutputStream ios = ImageIO.createImageOutputStream(outputStream);
        ImageWriter writer = ImageIO.getImageWritersByFormatName("jpeg").next();
        ImageWriteParam param = writer.getDefaultWriteParam();
        param.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
        param.setCompressionQuality(quality);

        writer.setOutput(ios);
        writer.write(null, new IIOImage(resizedImage, null, null), param);

        writer.dispose();
        ios.close();

        return outputStream.toByteArray();
    }
}