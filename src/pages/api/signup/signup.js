
import axios from "axios";


export default async function signup(req, res) {
    try {
        let url = `${process.env.development_ip}/signup`

        const response = await axios.post(url, req.body);

        return res
            .status(200)
            .json({ results: response.data, message: "insert successfull", success: true });
    } catch (error) {
        return res.status(200).json({ results: error, message: "insert failed", success: false });
    }

}
