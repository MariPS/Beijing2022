# Beijing2022
Web app per l'esplorazione dei dati relativi ai Giochi Olimpici Invernali di Pechino 2022.

## Strumenti utilizzati
La Web App è stata sviluppata utilizzando il framework FARM (FastAPI, React, MongoDB).

## Dataset
Il dataset è stato scaricato da: https://www.kaggle.com/piterfm/beijing-2022-olympics

Sono stati utilizzati i seguenti file csv: 
- athletes.csv
- entries_disciplines.csv
- events.csv
- medals.csv
- medals_total.csv

La cartella <code>data_preparation</code> contiene i notebook Jupyter per la creazione dei file json (per il popolamento del database). I file json prodotti sono stati inseriti nella cartella <code>file_popolamento_db</code>, che contiene anche lo script per il popolamento del database.
