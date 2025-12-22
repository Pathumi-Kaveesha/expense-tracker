import express, {Request, Response} from "express";
import { registerUser, loginUser, getUserInfo } from "../controllers/authController";
import upload from "../middleware/uploadMiddleware";
const {protect} = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", protect, getUserInfo);

router.post("/upload-image", upload.single("image"),(req: Request, res: Response) => {
    if(!req.file){
        return res.status(400).json({messsage: "No file uploaded"});
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(200).json({imageUrl});
})
export default router;
