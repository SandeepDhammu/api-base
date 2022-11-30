import formiable from "formidable";
import path from "path";
import fs from "fs";
import {fileURLToPath} from 'url';

export const upload = async (req, res) => {
  try {
    const form = new formiable.IncomingForm();
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const uploadFolder = path.join(__dirname, "../public", "files");

    form.multiples = false;
    form.uploadDir = uploadFolder;

    form.parse(req, async (err, fields, files) => {
      if (err) throw err;
      let file = files.media;
      const fileName = encodeURIComponent(file.originalFilename.replace(/\s/g, "-"));
      const newName = path.join(uploadFolder, fileName)
      fs.renameSync(file.filepath, newName);
      return res.data({
        url: newName,
        fileName,
      })
    });
  } catch (err) {
    res.failure(err);
  }
};
