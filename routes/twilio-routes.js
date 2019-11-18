const accountSid = 'AC46c243b7eead81643ec2d4bd25854c22';
const authToken = '61fa741c60f523fed9e25b093202ed2d';
const client = require('twilio')(accountSid, authToken);
const router = require('express').Router();

router.post('/', (req,res)=>{
  let {recipientPhone} = req.body;
  if(recipientPhone){
  client.messages
  .create({
     body: `Hello from school cal`,
     from: '+12017405267',
     to: `${recipientPhone}`
   })
  .then(message => console.log(message.sid));
  res.status(200).json({message:"message sent sucessfully"})
}else{
  res.status(400).json({error: 'Please provide a NAME and PHONE NUMBER for both the SENDER and RECIPIENT'})
}})


  module.exports = router;