// const testimonials = [
//   {
//     image:
//       "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600",
//     content: "Mantap bang!",
//     author: "Surya",
//     rating: 1,
//   },
//   {
//     image:
//       "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600",
//     content: "Mantap keren sekali!",
//     author: "Alfi Dharmawan",
//     rating: 2,
//   },
//   {
//     image:
//       "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600",
//     content: "Mantap keren sekali!",
//     author: "Alfi Dharmawan",
//     rating: 2,
//   },
// ];

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);

    xhr.onerror = () => {
      reject("Network error!");
    };

    xhr.onload = () => {
      resolve(JSON.parse(xhr.responseText));
    };

    xhr.send();
  });
}

async function allTestimonial() {
  try {
    const testimonials = await fetchUrl(
      "https://api.npoint.io/3dfaf2b4f57f3aefab8e"
    );

    const testimonialHTML = testimonials.map((testimonial) => {
      return `<div class="testimonial">
                  <img
                    src="${testimonial.image}"
                    class="profile-testimonial"
                  />
                  <p class="quote">${testimonial.content}</p>
                  <p class="author">- ${testimonial.author}</p>
                </div>`;
    });

    document.getElementById("testimonials").innerHTML =
      testimonialHTML.join(" ");
  } catch (error) {
    alert(error);
  }
}

async function filterTestimonial(rating) {
  try {
    const testimonials = await fetchUrl(
      "https://api.npoint.io/3dfaf2b4f57f3aefab8e"
    );

    const filteredTestimonialByRating = testimonials.filter((testimonial) => {
      return testimonial.rating == rating;
    });

    const testimonialHTML = filteredTestimonialByRating.map((testimonial) => {
      return `<div class="testimonial">
                      <img
                        src="${testimonial.image}"
                        class="profile-testimonial"
                      />
                      <p class="quote">${testimonial.content}</p>
                      <p class="author">- ${testimonial.author}</p>
                    </div>`;
    });

    document.getElementById("testimonials").innerHTML =
      testimonialHTML.join(" ");
  } catch (error) {
    alert(error);
  }
}

allTestimonial();
