import { useEffect, useState } from "react";
import axios from "axios";
const Test = ({ token, test }) => {
	const [data, setData] = useState("");
	useEffect(() => {
		const Test = async () => {
			const stuData = await axios.get(stuAPI, {
				headers: {
					Authorization: "Bearer " + token,
				},

			});
        
        
			const studata = stuData.data.response.data;
			setData(studata[0].dept +
					"-" +
					studata[0].section +
					" " +
					studata[0].semester +
					"th Sem");
                }
            console.log(test);
            
		Test()
        
	}, []);

	const stuAPI =
		"https://abes.platform.simplifii.com/api/v1/custom/getCFMappedWithStudentID";

	return <div>Test</div>;
};
export default Test;
