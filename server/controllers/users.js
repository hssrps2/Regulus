import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, house, patronus, picturePath }) => {
        return { _id, firstName, lastName, house, patronus, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
    try {
      const { id, friendId } = req.params;
      const user = await User.findById(id);
      const friend = await User.findById(friendId);
  
      if (user.friends.includes(friendId)) {
        user.friends = user.friends.filter((id) => id !== friendId);
        friend.friends = friend.friends.filter((id) => id !== id);
      } else {
        user.friends.push(friendId);
        friend.friends.push(id);
      }
      await user.save();
      await friend.save();
  
      const friends = await Promise.all(
        user.friends.map((id) => User.findById(id))
      );
      const formattedFriends = friends.map(
        ({ _id, firstName, lastName, house, patronus, picturePath }) => {
          return { _id, firstName, lastName, house, patronus, picturePath };
        }
      );
  
      res.status(200).json(formattedFriends);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };

  /*HOUSE UPDATE*/
  export const updateUserHouse = async (req, res) => {
    try {
      const { id, house } = req.params;
      const user = await User.findById(id);
  
      if (user) {
        user.house = house; // Update the user's house
        await user.save();
        res.status(200).json({ message: 'User house updated successfully.' });
      } else {
        res.status(404).json({ message: 'User not found.' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Error updating user house.' });
    }
  };

    /*PATRONUS UPDATE*/
    export const updateUserPatronus = async (req, res) => {
      try {
        const { id, patronus } = req.params;
        const user = await User.findById(id);
    
        if (user) {
          user.patronus = patronus; // Update the user's house
          await user.save();
          res.status(200).json({ message: 'User patronus updated successfully.' });
        } else {
          res.status(404).json({ message: 'User not found.' });
        }
      } catch (err) {
        res.status(500).json({ message: 'Error updating user patronus.' });
      }
    };