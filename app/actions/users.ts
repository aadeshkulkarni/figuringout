import User from "@/models/User";

export const fetchSearchSuggestions = async () => {
  const users = await User.find();
  return users;
};
