import multer from "multer";
const maxSize = 2 * 1024 * 1024;

const cast_storage = multer.diskStorage({
    destination : function (req, file, cb) {
         cb(null, "./public/images/cast_images");
    },
    filename : function (req, file, cb) {

         const uniqueSuffix = Date.now();
         const str_arr = file.originalname.split(".");
         const file_ext = str_arr.pop();
         const cast_filenme = str_arr.join("_");

         cb(null, cast_filenme + "_" + uniqueSuffix + "." + file_ext);
    }
 })

export const cast_upload = multer({storage : cast_storage, limits: { fileSize: maxSize }});

const movie_storage = multer.diskStorage({
     destination : function (req, file, cb) {
          cb(null, "./public/images/movie_images");
     },
     filename : function (req, file, cb) {
 
          const uniqueSuffix = Date.now();
          const str_arr = file.originalname.split(".");
          const file_ext = str_arr.pop();
          const movie_filenme = str_arr.join("_");
 
          cb(null, movie_filenme + "_" + uniqueSuffix + "." + file_ext);
     }
  })

export const movie_upload = multer({storage : movie_storage, limits: { fileSize: maxSize }});

const subcat_storage = multer.diskStorage({
     destination : function (req, file, cb) {
          cb(null, "./public/images/subcategory_images");
     },
     filename : function (req, file, cb) {
 
          const uniqueSuffix = Date.now();
          const str_arr = file.originalname.split(".");
          const file_ext = str_arr.pop();
          const subcat_filenme = str_arr.join("_");
 
          cb(null, subcat_filenme + "_" + uniqueSuffix + "." + file_ext);
     }
  })

export const subcat_upload = multer({storage : subcat_storage, limits: { fileSize: maxSize }});