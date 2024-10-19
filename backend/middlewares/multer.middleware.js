import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'

// Get __filename and __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadFolderPath = path.join(__dirname, '../../uploads');

const storage = multer.diskStorage(
  {
    destination: (req, file, cb)=>{
      cb(null, uploadFolderPath)
    },
    filename: (req, file, cb)=>{
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random()* 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  }
)

export const upload = multer({storage});