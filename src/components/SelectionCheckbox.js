function SelectionCheckbox(props) {
  return <input type="checkbox" checked={props.selectedProp} onChange={props.updateSelectionProp.bind(null, props.reagentProp.id)} />;
}

export default SelectionCheckbox;
