listener();

  function listener() {
    //ADD EVENTLISTENER ON VIDEO ELEMENT
    console.log('inside listener');
    videoSrc.addEventListener('playing', function() {
      console.log('EventListener added on video');
    
       //TRY TO DETECT FACES EVERY 100 MILLISECONDS
       setInterval(async () => {
         try{
         //OBS! CALLING DETECTALLFACES FUNCTION DOES NOT WORK ON ALL COMPUTERS!
         
         //const detections = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
         const detections = await faceapi.detectAllFaces(video8, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions()
         console.log('happy: ' + (detections[0].expressions.happy));
        }
        
        catch (err){
          console.log(err);
          //console.log("Something went wrong with face api!");
          readFace = false;
          }
        }, 200)
      })
    }