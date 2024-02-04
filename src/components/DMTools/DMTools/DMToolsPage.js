import React from "react";
import { useSelector } from "react-redux";
import { useAuthState } from "../../../firebase";
import { Navigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import { PageTitle } from "../../Components/PageTitle/PageTitle";
import { Footer } from "../../../components/Components/Footer/Footer";

// Styles
import st from './DMToolsPage.module.scss';
import { selectDCsData } from "../../../features/firebase/dcsDataSlice";

function DMToolsPage() {
	const { ...auth } = useAuthState();
	if (auth.user?.uid !== "LrOb5kepZdSNuzkH6qGlmIrphas1") return <Navigate to="/" />

	const dcs = useSelector(selectDCsData);
	console.log(dcs);
	
	/**
	 * CJSX
	 * */
	return (
		<React.Fragment>
			<Header colour="silver" />
			<PageTitle colour="silver">DM Tools</PageTitle>
			<div className={"mainContent " + st.dmToolsLayout}>
				<div className={st.dcTable}>
					{dcs.map((dc, index) => (
						<div key={`'dc-${index}`} className={st.dc}><div className={st.name}>DC {dc.dc}:</div> {dc.roll}</div>
					))}
				</div>
			</div>
			<Footer />
		</React.Fragment>
	);
}

export default DMToolsPage;