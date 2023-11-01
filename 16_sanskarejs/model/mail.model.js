import nodemailer from 'nodemailer';
const config={
    service:"gmail",
    host:"smtp.gmail.com",
    port:587,
    secure:true,
    auth:{
        user:"harshika.p3.hp@gmail.com",
        pass:"upjzyigymhysrrbl",
    },
};
export const send=(data)=>{
    const transporter=nodemailer.createTransport(config);
    transporter.sendMail(data,(err,info)=>{
        if(err)
        console.log("Err while sending mail "+err);
    else
    console.log("Successfully sended ",info);
    })
}