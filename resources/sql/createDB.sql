CREATE TABLE survey (
	id SERIAL primary key,
	name varchar,
	abstract bytea,
	dateLastUpdate date
);

CREATE TABLE question (
	id SERIAL primary key,
	survey_id int references survey(id),
	questionNumber int,
	questionType varchar
);