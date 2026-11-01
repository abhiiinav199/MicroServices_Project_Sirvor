import bcryptjs from "bcryptjs";

export interface IComparePassword {
    oldPassword: string;
    dbPassword: string;
}

export const comparePassword = async (data: IComparePassword): Promise<boolean> => {
    const { oldPassword, dbPassword } = data;
    return await bcryptjs.compare(oldPassword, dbPassword);
};
