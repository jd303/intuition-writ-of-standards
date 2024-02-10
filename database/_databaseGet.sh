#!/bin/zsh

firebase database:get /animal_companions > ./database/animal_companions.json;
firebase database:get /characters > ./database/characters.json;
firebase database:get /combats > ./database/combats.json;
firebase database:get /data_standards > ./database/data_standards.json;
firebase database:get /dcs > ./database/dcs.json; 
firebase database:get /equipment > ./database/equipment.json; 
firebase database:get /gadgets > ./database/gadgets.json; 
firebase database:get /languages > ./database/languages.json; 
firebase database:get /menagerie > ./database/menagerie.json; 
firebase database:get /moves > ./database/moves.json; 
firebase database:get /racial_bonuses > ./database/racial_bonuses.json; 
firebase database:get /sources > ./database/sources.json; 
firebase database:get /spells > ./database/spells.json; 
firebase database:get /statuses > ./database/statuses.json; 
firebase database:get /weapon_specialisations > ./database/weapon_specialisations.json; 

python -m json.tool ./database/animal_companions.json > ./database/animal_companions.formatted.json;
python -m json.tool ./database/characters.json > ./database/characters.formatted.json;
python -m json.tool ./database/combats.json > ./database/combats.formatted.json;
python -m json.tool ./database/data_standards.json > ./database/data_standards.formatted.json;
python -m json.tool ./database/dcs.json > ./database/dcs.formatted.json;
python -m json.tool ./database/equipment.json > ./database/equipment.formatted.json;
python -m json.tool ./database/gadgets.json > ./database/gadgets.formatted.json;
python -m json.tool ./database/languages.json > ./database/languages.formatted.json;
python -m json.tool ./database/menagerie.json > ./database/menagerie.formatted.json;
python -m json.tool ./database/moves.json > ./database/moves.formatted.json;
python -m json.tool ./database/racial_bonuses.json > ./database/racial_bonuses.formatted.json;
python -m json.tool ./database/sources.json > ./database/sources.formatted.json;
python -m json.tool ./database/spells.json > ./database/spells.formatted.json;
python -m json.tool ./database/statuses.json > ./database/statuses.formatted.json;
python -m json.tool ./database/weapon_specialisations.json > ./database/weapon_specialisations.formatted.json;

rm ./database/animal_companions.json;
rm ./database/characters.json;
rm ./database/combats.json;
rm ./database/data_standards.json;
rm ./database/dcs.json;
rm ./database/equipment.json;
rm ./database/gadgets.json;
rm ./database/languages.json;
rm ./database/menagerie.json;
rm ./database/moves.json;
rm ./database/racial_bonuses.json;
rm ./database/sources.json;
rm ./database/spells.json;
rm ./database/statuses.json;
rm ./database/weapon_specialisations.json;