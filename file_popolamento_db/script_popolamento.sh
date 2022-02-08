#!/bin/bash
mongoimport --db=Beijing2022 --collection=disciplines --file=disciplines.json
mongoimport --db=Beijing2022 --collection=medals --file=medals.json
mongoimport --db=Beijing2022 --collection=results --file=results.json
