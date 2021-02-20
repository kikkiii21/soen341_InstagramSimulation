import { v4 as uuidv4 } from "uuid";
import { uniqueNamesGenerator, colors, names } from 'unique-names-generator';




export const getName = () =>{
    const randomName = uniqueNamesGenerator({ dictionaries: [names, colors] });
   
  const shortName = uniqueNamesGenerator({
    dictionaries: [names, colors], 
    length: 2
  });
  return randomName;
}


function postsCollection() {
  return [
    {
      name: getName(),
      avatar: "https://fakeface.rest/face/view",
      postImage: `https://picsum.photos/seed/${uuidv4()}/1100/800`,
      postComment: "Forget not that the earth delights to feel your bare feet and the winds long to play with your hair. —Khalil Gibran",
      id: uuidv4(),
    },
    {
        name: getName(),
        avatar: "https://fakeface.rest/face/view",
        postImage: `https://picsum.photos/seed/${uuidv4()}/1100/800`,
        postComment: "I go to nature to be soothed and healed, and to have my senses put in order. —John Burroughs",
        id: uuidv4(),
      },
      {
        name: getName(),
        avatar: "https://fakeface.rest/face/view",
        postImage: `https://picsum.photos/seed/${uuidv4()}/1100/800`,
        postComment: "If you truly love nature, you will find beauty everywhere. —Laura Ingalls Wilder",
        id: uuidv4(),
      },
      {
        name: getName(),
        avatar: "https://fakeface.rest/face/view",
        postImage: `https://picsum.photos/seed/${uuidv4()}/1100/800`,
        postComment: "Look deep into nature, and then you will understand everything better. —Albert Einstein",
        id: uuidv4(),
      },
      {
        name: getName(),
        avatar: "https://fakeface.rest/face/view",
        postImage: `https://picsum.photos/seed/${uuidv4()}/1100/800`,
        postComment: "Heaven is under our feet as well as over our heads. —Henry David Thoreau",
        id: uuidv4(),
      },
      {
        name: getName(),
        avatar: "https://fakeface.rest/face/view",
        postImage: `https://picsum.photos/seed/${uuidv4()}/1100/800`,
        postComment: "To me a lush carpet of pine needles or spongy grass is more welcome than the most luxurious Persian rug. —Helen Keller",
        id: uuidv4(),
      },
    
  ];
}

export default postsCollection;