#!/bin/bash
mongoimport --db=Beijing2022 --collection=disciplines --file=disciplines.json
mongoimport --db=Beijing2022 --collection=rankings --file=rankings.json
mongoimport --db=Beijing2022 --collection=events --file=events.json
