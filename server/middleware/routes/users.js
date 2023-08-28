import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  updateUserHouse, 
  updateUserPatronus
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

/*HOUSE UPDATE*/

router.patch('/:id/update-house/:house', verifyToken, updateUserHouse);

/*PATRONUS UPDATE*/

router.patch('/:id/update-patronus/:patronus', verifyToken, updateUserPatronus);

export default router;