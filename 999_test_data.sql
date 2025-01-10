INSERT INTO users (
	username, 
	password,
	description, 
	image_url
) VALUES (
	'Technostalgic',
	'$2a$10$yPd6rqLe1z2l/59fAIEAFe4h8E3mOinYnJVLZHm3nm20/pFVVup/q',
	'Big ol'' nerd',
	'https://technostalgic.gitlab.io/portfolio/files/media/avatar.png'
),(
	'Pepper',
	'$2a$10$yPd6rqLe1z2l/59fAIEAFe4h8E3mOinYnJVLZHm3nm20/pFVVup/q',
	'Currently probably asleep or scratching expensive furniture',
	'https://cdn.discordapp.com/attachments/541309973938831421/1271233273909088286/IMG_20240808_162559026.jpg?ex=6752d17e&is=67517ffe&hm=4479097ed5169455db8c10fa1db759c58ad08566f85b9e02d0affb11a2fdbf93&'
) ON CONFLICT (username) DO NOTHING;

INSERT INTO posts (
	username, 
	company_name, 
	position, 
	link, 
	modality, 
	body, 
	salary, 
	upvotes, downvotes
) VALUES (
	'Technostalgic', 
	'Laboratory for Atmospheric and Space Physics at CU', 
	'Undergraduate Python Developer',
	'https://lasp.colorado.edu/careers/',
	2,
	'Quick interview process',
	20000,
	0, 0
),(
	'Pepper', 
	'Purrrfect Solutions Inc.', 
	'Chief Gravity Tester',
	'https://www.youtube.com/watch?v=09CC-dYDNMQ',
	0,
	'It''s tough knocking stuff over all day',
	3.50,
	0, 0
),(
	'Technostalgic',
	'National Solar Observatory',
	'Undergraduate Research Assistant',
	'https://nso.edu/about/jobs/',
	0,
	'Pretty ☀ Pics',
	3000,
	0, 0
) ON CONFLICT (post_id) DO UPDATE SET
	username = EXCLUDED.username,
	company_name = EXCLUDED.company_name,
	position = EXCLUDED.position,
	link = EXCLUDED.link,
	modality = EXCLUDED.modality,
	body = EXCLUDED.body,
	salary = EXCLUDED.salary,
	upvotes = EXCLUDED.upvotes,
	downvotes = EXCLUDED.downvotes
;