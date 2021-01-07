<h1 align="center" style="font-size: 30px">This repo contains the client side code for the portfolio project</h1>

### I am using the `Create React App` and the following packages:

#### `react-hook-form` &#8212; `react-datepicker` &#8212; `react-external-link` &#8212; `react-scroll` &#8212; `react-tooltip` `react-icons` &#8212; `axios`

#

**2021/01/06** feature &#8212; **embedded audio file with name pronounciation**

<div align="center">
<img src="https://media.giphy.com/media/3RTGo5YQ6WeltjVyO5/giphy.gif" width="60%"/></div>

#

See also backend repo: https://github.com/ioanatatu/portfolio-aws-backend \
Or visit the webpage: https://ioanatatu.com

<hr style="margin-bottom: 40px">
<h1 align="center" style="font-size: 30px">What is this project about?</h1>

**&#8212;** I am - what you would call in German - a "Quereinsteiger" in this
profession and therefore take learning very seriously. I have a daily routine of
coding and am working on different projects, but nothing is fully finished at the
moment. This is why I wanted to build a project where I could log the tasks that I am
working on every day, their resources (images, links with articles etc), how long I
spend on each one and how much time I use working with a particular technology (react,
nodeJS, styling...). And because this app tracks my coding progress, I would also be
using it as a portfolio, to showcase my skills to potential employers.

**&#8212;** As a first step, I developed the React component architecture and tracked
my tasks in a json object, which I would then import in React. I decided I needed a
backend and database, where I could store data properly and where my client could make
requests to. However, my frontend was comfortably hosted on netlify (also connected to
my domain name), so I didn't want to move all that to heroku, where I am hosting
previous projects. I therefore chose the **RESTful API** approach and **AWS**, which
would also give me the opportunity to learn more about these topics. Becoming familiar
with (a tiny part of) the AWS ecosystem was a nightmare, but every step forward felt
like the sweetest victory.

**&#8212;** At the moment I have the **projects** and **journal-entries** tables in my
DynamoDB and I can perform **create, read and remove operations** on them from the
client-side. I am using these features to add my projects and journal-entries (these
are the tasks I am working on every day) and validate the input with forms I built in
React. At the same time I also wanted to demo these features to visitors, without
really deleting data from the database. I decided to mimick these actions on the
client-side (create and delete) if no password would be entered. No password - no
request to the backend. However, if a password is entered, it will be validated on the
backend and very likely - I hope... :) - will throw an error, as I am the only holder
of the magic key. 🔑

**&#8212;** An interesting challenge I am facing is switching between the different
technologies and perspectives, jumping from configuring the serverless yaml file for
the backend, to setting state for a tiny button in React when the audio file has
finished playing. All in all it's a trip and I'm loving it 👩🏻‍💻
