1/ What is the difference between var, let, and const?
    Ans: তিনটাই variable বানানোর উপায়, কিন্তু আচরণ আলাদা।
  var পুরনো দিনের। যেখানে ইচ্ছা সেখান থেকে access করা যায়, আবার একই নামে বারবার declare করা যায়। এই কারণে অনেক bug হত।
  let আধুনিক। যে block-এর ভেতরে লিখবে সেখানেই সীমাবদ্ধ। Value পরে বদলানো যায়।
  const একবার value দিলে আর বদলানো যায় না। তবে object বা array হলে ভেতরের data বদলানো যায়।
  সহজ নিয়ম — সবসময় const দিয়ে শুরু করো, পরে বদলাতে হলে let ব্যবহার করো, var এড়িয়ে চলো।

2/ What is the spread operator (...)?
  Ans: Spread মানে ছড়িয়ে দেওয়া। কোনো array বা object-এর ভেতরের সব কিছু বের করে ছড়িয়ে দেয়।
  Array copy করতে, দুইটা array জোড়া লাগাতে, বা object-এ নতুন কিছু যোগ করতে কাজে লাগে। দেখতে মাত্র তিনটা dot, কিন্তু অনেক জায়গায় কাজে আসে।
  Example:
  const a = [1, 2, 3];
  const b = [...a, 4, 5];
  
  const user = { name: "Emonhossan" };
  const updated = { ...user, age: 20 };

3/ What is the difference between map(), filter(), and forEach()?
  Ans: তিনটাই array-এর উপর loop করে, কিন্তু উদ্দেশ্য আলাদা।
  forEach শুধু কাজ করে, কিছু return করে না। যেমন প্রতিটা জিনিস print করা।
  map প্রতিটা element বদলে নতুন একটা array বানায়। Original array অক্ষত থাকে।
  filter শর্ত মিলে এমন element গুলো রেখে নতুন array বানায়।
  সহজ কথায় — transform করতে map, বাছাই করতে filter, শুধু কাজ করতে forEach।

4/  What is an arrow function?
  Ans: Function লেখার একটা ছোট আর পরিষ্কার উপায়। function keyword না লিখে => দিয়ে লেখা হয়।
  ছোট ছোট কাজের জন্য অনেক সুবিধাজনক, code কম লিখতে হয়। 
  একটাই বড় পার্থক্য হলো এর নিজস্ব this নেই, বাইরের this ধরে রাখে।
  Example : const add = (a, b) => a + b;


5/ What are template literals?
  Ans: Backtick দিয়ে string লেখার উপায়। এর সবচেয়ে বড় সুবিধা হলো সরাসরি variable বা 
  যেকোনো expression string-এর ভেতরে বসানো যায়।
  আগে + দিয়ে জোড়া লাগাতে হত, এখন সেটা লাগে না।
  Multi-line string লেখাও সহজ। Code অনেক বেশি পরিষ্কার আর readable হয়।

