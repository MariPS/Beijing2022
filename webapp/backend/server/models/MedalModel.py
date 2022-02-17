from typing import Optional
from fastapi import FastAPI
from pydantic import BaseModel

# Il data model della medaglia memorizzata nelle liste 
# "gold_medals","silver_medals" e "bronze_medals"
# della collezione "rankings"
class MedalModel(BaseModel):
    medal_type: str
    medal_date: str
    athlete_short_name: str
    athlete_name: str
    athlete_sex: str
    athlete_link: Optional[str] = None
    event: str
    country: str
    country_code: str
    discipline: str
    discipline_code: str


class UpdateMedalModel(BaseModel):
    medal_type: Optional[str] = None
    medal_date: Optional[str] = None
    athlete_short_name: Optional[str] = None
    athlete_name: str
    athlete_sex: Optional[str] = None
    athlete_link: Optional[str] = None
    event: str
    country: Optional[str] = None
    country_code: Optional[str] = None
    discipline: Optional[str] = None
    discipline_code: Optional[str] = None