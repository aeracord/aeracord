import { promises as fs } from "fs";
import { CreateMessageFile, EmbedAttachment } from "../internal";

export interface CreateMessageAttachment {
    filename: string;
    image: Buffer;
}

/**
 * Parse Attachments
 *
 * Parse attachments before sending them to the API
 *
 * @param files The files
 *
 * @returns {CreateMessageAttachment[]} The attachments
 */
export default async function parseAttachments(files: Array<CreateMessageFile | EmbedAttachment>): Promise<CreateMessageAttachment[]> {

    // Define attachments
    const attachments: CreateMessageAttachment[] = [];

    // Loop through files
    for (let file of files) {

        // Define image
        let image: Buffer;

        // If the file is a path, read the image file
        if (typeof file.image === "string") image = await fs.readFile(file.image);

        // Otherwise, use the buffer
        else image = file.image;

        // Add to attachments
        attachments.push({ filename: file.filename, image });
    }

    // Return
    return attachments;
}