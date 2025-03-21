import bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
    // Retrive salt rounds from environment variables
    const saltRounds = parseInt(process.env.SALT_ROUNDS || '10');
    // Genarate Encrypted password with bcrypt
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};

// Compare a plain text password with a hashed password
export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(password, hash);
};