import { PropTypes } from "prop-types";
import MoveComponent from "./MoveComponent";
import Listing from "../Listings/Listing";
import st from "./MovesAndModsPage.module.scss";

MoveCategoryComponent.propTypes = {
	name: PropTypes.string.isRequired,
	category: PropTypes.array.isRequired,
	searchFilterValue: PropTypes.string
};

function MoveCategoryComponent(props) {
	let { name, category, searchFilterValue } = props;

	return (
		<div className={[st.categoryContainer].join(' ')}>
			<h3 className={st.categoryTitle}>{name}</h3>
			{category.map((move, index) => (
				<Listing key={index}>
					<MoveComponent key={index} move={move} searchFilterValue={searchFilterValue} />
				</Listing>
			))}
		</div>
	);
}

export default MoveCategoryComponent;
