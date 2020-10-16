<p align="center">
  <img width="auto" height="auto" src="https://i.imgur.com/omHBxjO.png" />
</p>
<h1 align="center">Gym Control - Project</h1>
<h2>📜 Introduction</h2>
<p>Gym Control is an simple Website created during my learning in <b>Rocketseat Launchbase Bootcamp</b> where the students 
were requested of doing an app to serve as an Gym Control.</p>
<p>That was one of the first application made on the Bootcamp and was made for educational purposes. In that Website, the Gym admin register new Instructors, Members and
can associate them to create a correlation beetween members and instructors. The Website asks for Instructors knowledge at the gym and creates the possibilitie to any member to filter and
choose their instructors based on their interests.</p>
<h2>👨‍💻 Technologies</h2>
<p><b>The project was built with the use of the following technologies:</b></p>
<ul>
  <li>Node.js;</li>
  <li>JavaScript;</li>
  <li>PostgreSQL;</li>
  <li>HTML5;</li>
  <li>CSS3.</li>
</ul>
<p><b>And used the following libs/frameworks:</b></p>
<ul>
  <li>express.js;</li>
  <li>nunjucks.</li>
</ul>
<h2>🚀 Setting up</h2>
<p>To start using the application, download it and store it in an node.js enviroment, then, in an terminal with the opened project type:</p>
<p>If you preffer to use git to clone my repository, use the following steps in your node.js enviroment:</p>
<div align="center">
  <code width="900px">
    git init
  </code>
  <code width="900px">
    git clone https://github.com/eric-zanchettin/gymcontrol.git
  </code>
</div>
<p>If you choose or not to use git, these are the same following steps:</p>
<div align="center">
  <code width="900px">npm install</code>
</div>
<p>This will install all dependencies used on this project, after that, you need to create the database with these specifications:</p>
<code>
            
            CREATE DATABASE gymmanager
            
            CREATE TABLE instructors (
            id SERIAL PRIMARY KEY,
            avatar_url TEXT,
            name TEXT,
           	birth TIMESTAMP,
            gender TEXT,
            services TEXT,
            created_at TIMESTAMP
            )
      
            CREATE TABLE members (
            id SERIAL PRIMARY KEY,
            name TEXT,
            avatar_url TEXT,
            email TEXT,
            gender TEXT,
            birth	TIMESTAMP,
            blood	TEXT,
            weight INT,
            height INT,
            instructor_id	INT,
              CONSTRAINT fk_instructor_id
              	FOREIGN KEY(instructor_id)
              		REFERENCES instructors(id)
            )
</code>
<p><b>IMPORTANT:</b> Remember to change the db.js inside the config file informing your credentials to the PostegreSQL Pool!!!</p>
<p align="center">
  <img width="auto" height="auto" src="https://i.imgur.com/F6khkvm.png" />
</p>
<p>Now you just have to run the server with:</p>
<div align="center">
  <code width="900px">npm start</code>
</div>
<p>To start the server and access http://localhost:3000 to start using the website.</p>
<p align="center">
  <img width="64" height="auto" src="https://i.imgur.com/1BZZqy0.png" />
</p>
<h2>What is <b>Rocketseat Launchbase Bootcamp?</b></h2>
<p>Rocketseat Launchbase is a Bootcamp with the purpose of leveraging the career of those who participate getting straight to the point of programming: CODE!
It is a incredible way of getting the first steps on programming and also, a very good way to expand your knowledge and get to the next level of programming. If you want to know more, feel free to check out <a href="https://github.com/Rocketseat">their GitHub</a> as well.</p>
