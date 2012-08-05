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

CREATE TABLE label (
	id SERIAL primary key,
	question_id int references question(id),
	lang varchar,
	label bytea
);

SELECT * FROM survey;