import React, { useState, useEffect } from 'react';
import RankingBoard from './RankingBoard';
import Select from 'react-select';
import "../Home.css";



function AdminBoard(props) {
    const [optionsDiscipline, setOptionsDiscipline] = useState();
    const [selectedDiscipline, setSelectedDiscipline] = useState();
    const [optionsCountry, setOptionsCountry] = useState();
    const [selectedCountry, setSelectedCountry] = useState();
    const [optionsAthletes, setOptionsAthletes] = useState();
    const [selectedAthlete, setSelectedAthletes] = useState();
    const [athletesData, setAthletesData] = useState();
    const [selectedAthleteData, setSelectedAthletesData] = useState();
    const [optionsEventsLocation, setOptionsEventsLocation] = useState();
    const [optionsEventsStage, setOptionsEventsStage] = useState();
    const [eventsData, setEventsData] = useState();
    const [selectedEventData, setSelectedEventData] = useState();
    const [selectedEventLocation, setSelectedEventLocation] = useState();
    const [selectedEventStage, setSelectedEventStage] = useState();
    const [optionsMedalType, setOptionsMedalType] = useState();
    const [selectedMedalType, setSelectedMedalType] = useState()
    const [reRender, setReRender] = useState(false);
    const [postStatus, setPostStatus] = useState();

    const handleSubmit = event => {

        event.preventDefault();

        const post_body = {
            medal_type: selectedMedalType.value,
            medal_date: selectedEventData.time,
            athlete_short_name: selectedAthleteData.short_name,
            athlete_name: selectedAthleteData.name,
            athlete_sex: selectedAthleteData.gender,
            athlete_link: selectedAthleteData.url,
            event: selectedEventData.event_stage,
            country: selectedCountry.value,
            country_code: selectedAthleteData.country_code,
            discipline: selectedDiscipline.value,
            discipline_code: selectedAthleteData.discipline_code
        }


        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(post_body)
        };

        console.log(requestOptions)

        fetch('/rankings', requestOptions)
            .then(response => response.json())
            .then(data => setPostStatus(data))
    }

    useEffect(() => {
        if (postStatus) {
            setReRender(true)
        }
    },[postStatus])

    useEffect(() =>{
        if(reRender){
            setReRender(false)
        }
    },[reRender])

    // fires only once at startup
    // imposta i nomi delle discipline
    useEffect(() => {
        fetchDisciplinesNames().then(response => {
            setOptionsDiscipline(response)
        });

        const medalTypes = [
            { value: "Gold", label: "Gold" },
            { value: "Silver", label: "Silver" },
            { value: "Bronze", label: "Bronze" }
        ]

        setOptionsMedalType(medalTypes);
    }, [])

    // recupera i nomi delle discipline
    async function fetchDisciplinesNames() {
        const response = await fetch('/disciplines/names');  // is a list of strings
        let res = await response.json();
        let newOptions = [];
        newOptions.push(res.map(data => {
            return { "value": data, "label": data };
        }));
        return newOptions;
    }


    // eseguito dopo aver selezionato il nome della disciplina
    // recupera i nomi dei paesi che partecipano in quella disciplina
    // e gli eventi per quella discipline
    useEffect(() => {
        setPostStatus(null);
        setSelectedCountry(null);
        setSelectedEventLocation(null);
        setSelectedEventStage(null);

        // recupera i nomi dei paesi per quella disciplina
        async function fetchCountryNames() {
            const response = await fetch(`/discipline-countries/${selectedDiscipline.value}`)
            let res = await response.json();
            let newOptions = [];
            newOptions.push(res.map(data => {
                return { "value": data, "label": data };
            }));
            return newOptions;
        }

        // recupera i dati degli eventi per quella disciplina
        async function fetchEvents() {
            const response = await fetch(`/events/discipline=${selectedDiscipline.value}`)
            let res = await response.json();
            return res;
        }

        // salva i dati degli eventi recuperati
        async function setFetchedEventsData(data) {
            setEventsData(data);
        }

        // prepara il dict (value, label) per gli eventi
        async function prepareFetchedEventsLocationsOptions(fetched_data) {

            // prendi solo gli eventi che hanno una data (time)
            let selected = fetched_data.filter((event) => {
                return (event.time != null)
            })

            let newOptions = [];
            newOptions.push(selected.map(data => {
                return { "value": data.location, "label": `${data.location} ${data.time}` };
            }));
            return newOptions
        }

        // se la disciplina è stata selezionata,
        //  recupera i nomi dei paesi,
        //  i dati sugli eventi,
        //  e imposta le opzioni (values, labels) per i paesi e per gli eventi
        if (selectedDiscipline != null) {
            console.log("selected discipline = ", selectedDiscipline);

            fetchCountryNames().then(response => {
                setOptionsCountry(response)
            });

            fetchEvents().then(response => {
                setFetchedEventsData(response);
                prepareFetchedEventsLocationsOptions(response).then((prepared) =>
                    setOptionsEventsLocation(prepared)
                )
            })
        }

    }, [selectedDiscipline])


    useEffect(() => {
        setSelectedEventStage(null);
        console.log("selected event location = ", selectedEventLocation)
        async function prepareFetchedEventsStageOptions(fetched_data) {

            // prendi solo gli eventi che hanno la stessa data selezionata
            let selected = fetched_data.filter((event) => {
                return (`${event.location} ${event.time}` === selectedEventLocation.label)
            })

            let newOptions = [];
            selected.map(data =>
                newOptions.push({ "value": data.event_stage, "label": data.event_stage })
            );
            return newOptions
        }

        if (selectedEventLocation != null) {
            prepareFetchedEventsStageOptions(eventsData).then((prepared) =>
                setOptionsEventsStage(prepared))
            console.log("prepared!!!!!!!!");
        }

    }, [selectedEventLocation])


    useEffect(() => {
        console.log("event stage options = ", selectedEventStage)

        if (selectedEventStage != null) {
            let selected = null;

            selected = eventsData.find((event) => {
                return (event.location === selectedEventLocation.value
                    && event.event_stage === selectedEventStage.value)
            })

            setSelectedEventData(selected);
        }

    }, [selectedEventStage])



    // eseguito dopo aver selezionato il paese
    // recupera i nomi degli atleti di quel paese 
    // che gareggiano nella disciplina selezionata
    useEffect(() => {

        setSelectedAthletes(null);

        async function fetchAthletes() {
            const response = await fetch(`/athletes/${selectedDiscipline.value}/${selectedCountry.value}`)
            let res = await response.json();
            return res;
        }

        async function setFetchedAthletesData(data) {
            setAthletesData(data)
        }

        async function prepareFetchedAthletesOptions(fetched_data) {
            let newOptions = [];
            newOptions.push(fetched_data.map(data => {
                return { "value": data.name, "label": data.name };
            }));
            return newOptions
        }

        if (selectedCountry != null) {
            console.log("selected country = ", selectedCountry);


            fetchAthletes().then(response => {
                setFetchedAthletesData(response);
                prepareFetchedAthletesOptions(response).then((prepared) =>
                    setOptionsAthletes(prepared)
                );
            });
        }

    }, [selectedCountry])


    useEffect(() => {
        console.log("selected athlete = ", selectedAthlete)

        if (selectedAthlete != null) {
            let selected = null;

            selected = athletesData.find((athlete) => {
                return (athlete.name === selectedAthlete.value)
            })

            setSelectedAthletesData(selected);
        }
    }, [selectedAthlete])


    useEffect(() => {
        console.log("selected event data = ", selectedEventData)
    }, [selectedEventData])

    useEffect(() => {
        console.log("events data = ", eventsData)
    }, [eventsData])

    return (
        <div className="admin-dashboard">
            <div className='admin-ranking-board'>
                {!reRender && <RankingBoard />}
            </div>
            <div className='admin-ranking-options'>
                <p className='admin-ranking-options-title' >Add Medal for:</p>
                <form onSubmit={handleSubmit}>
                    <Select placeholder="Discipline" isSearchable value={selectedDiscipline} onChange={setSelectedDiscipline} options={optionsDiscipline && optionsDiscipline[0]} />
                    <Select placeholder="Event Location" isSearchable value={selectedEventLocation} onChange={setSelectedEventLocation} options={optionsEventsLocation && optionsEventsLocation[0]} />
                    <Select placeholder="Event Stage" isSearchable value={selectedEventStage} onChange={setSelectedEventStage} options={optionsEventsStage && optionsEventsStage} />
                    <Select placeholder="Country" isSearchable value={selectedCountry} onChange={setSelectedCountry} options={optionsCountry && optionsCountry[0]} />
                    <Select placeholder="Athlete" isSearchable value={selectedAthlete} onChange={setSelectedAthletes} options={optionsAthletes && optionsAthletes[0]} />
                    <Select placeholder="Medal type" isSearchable value={selectedMedalType} onChange={setSelectedMedalType} options={optionsMedalType && optionsMedalType} />
                    <p className='admin-submit'>
                        <input className='admin-submit-button' type="submit" />
                    </p>
                </form>
                {postStatus === true && <p className='admin-submit-response'>Medal was added successfully!</p>}
                {postStatus === false && <p className='admin-submit-response'>Failed to add medal...</p>}
            </div>


        </div>

    )
}

export default AdminBoard;