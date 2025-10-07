
from sqlalchemy import create_engine, Column, Integer, String, DateTime, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import datetime

DATABASE_URL = 'sqlite:///./regenova.db'

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class ModelRecord(Base):
    __tablename__ = 'models'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    path = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    metadata = Column(Text, nullable=True)

def init_db():
    Base.metadata.create_all(bind=engine)

