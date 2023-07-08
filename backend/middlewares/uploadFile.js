// const multer = require("multer");
/* in case you have used a file uploaded like multer ...*/
// // Create a Multer storage instance
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // Specify the destination folder for storing uploaded files
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const fileExtension = file.originalname.split(".").pop();
//     cb(null, file.fieldname + "-" + uniqueSuffix + "." + fileExtension); // Generate a unique filename for the uploaded file
//   },
// });

// // Create a Multer upload instance with the storage configuration
// const upload = multer({ storage });

// // Middleware function for handling file uploads
// const uploadFile = (req, res, next) => {
//   // Use the 'upload' Multer instance to handle the file upload
//   upload.single("logo")(req, res, (err) => {
//     if (err) {
//       // Handle any error that occurs during file upload
//       return res.status(500).json({ error: "Failed to upload file" });
//     }
//     next();
//   });
// };

// module.exports = upload;
