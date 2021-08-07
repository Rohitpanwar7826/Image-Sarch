let imgs_set = document.getElementById("imgs_collections");
let info = document.getElementById("info");
let one_img_set = document.getElementById("one_img");
let btn = document.getElementById("btns");
let d_btn = document.getElementById("btn_dark");
let content = []
let counter = 1;
let collection_array = 0;

window.onscroll = function () { scrollup() }
let scroll_btn = document.getElementById("scollbtn");
let scrollup = () => {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scroll_btn.style.display = "block";
    }
    else {
        scroll_btn.style.display = "";
    }
}
scroll_btn.addEventListener('click', myfn = () => {
    not_found_up();
});





const sarch = () => {
    let data = document.getElementById("sarched_data").value;
    if (data == "") {
        alert("Please fill sarch Box");
    }
    else {
        counter = 1;
        fatch_sarch(counter, data);
        if (one_img_set != null) {
            one_img_set.style.display = "none";
        }
        up();
    }
}
const download = (e) => {
    let img_content_name = document.getElementById("sarched_data").value;
    if (img_content_name == "") {
        img_content_name = "Motivational";
    }
    let img_name = prompt('Enter the image name : ', `${img_content_name}`);
    if (img_name != null) {
        saveAs(content[e.value]['urls']['full'], img_name);

    }


}

const full_view = (t) => {
    one_img(t.value)
}

const one_img = (...args) => {
    one_img_set.style.display = "";
    let desc = content[args[0]]['description'];
    if (desc == null || desc == "Nah" || desc == undefined) {
        desc = "Sorry Not found..!";
    }
    let img_code = `
            <img data-aos="zoom-in" data-aos-offset="180" data-aos-delay="1000" data-aos-duration="1000" class="shadow-xl lg:w-1/3 sm:w-full md:w-full mt-4 mr-auto ml-auto" src="${content[args[0]]['urls']['full']}" alt="imgs">
            <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">Likes - ${content[args[0]]['likes']}</div>
                <p class="text-gray-700 text-base">
                  ${desc}
                </p>
            </div>
            <div class="px-6 pt-4 pb-2">

                <span
                    class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Color code : ${content[args[0]].color}</span>
                   <br>
                   
                    <button onclick="download(this)" value="${args[0]}" class="sm:w-1/2 lg:w-1/6 rounded-2xl mt-4 mb-9 bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ">
                    Download
                    </button>
            </div>`
    one_img_set.innerHTML = img_code;
    up();
}



var fatch_data = (...args) => {
    fetch(`https://api.unsplash.com/search/photos?page=${args[0]}}&query=${args[1]}&client_id=mRByr6N-dgI-dH1hilvUiW6XPqTeVOHCT3-CACwtoho&per_page=30&X-Ratelimit-Limit: 1000`)
        .then(response => {
            return response.json();
        }).then(element => {

            collection_array = element['total_pages'];
            set_data(element);
        })
        .catch(err => {
            console.error(err);
        })

}
var fatch_sarch = (...args) => {
    fetch(`https://api.unsplash.com/search/photos?page=${args[0]}}&query=${args[1]}&client_id=mRByr6N-dgI-dH1hilvUiW6XPqTeVOHCT3-CACwtoho&per_page=30&X-Ratelimit-Limit: 1000`)
        .then(response => {
            return response.json();
        }).then(element => {
            collection_array = element['total_pages'];
            set_sarch(element);
        })
        .catch(err => {
            console.error(err);
        })

}

function dark_mode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
    var btn = document.getElementById("btn_dark");
    if (element.className == 'dark-mode') {
        btn.innerHTML = "Light Mode";
        element.style.backgroundColor = "black";
    }
    else {
        btn.innerHTML = "Dark Mode";
        element.style.backgroundColor = "white";
    }
}

const next = () => {
    let data = document.getElementById("sarched_data").value;
    if (data == "") {
        data = "motivational";
    }
    if (one_img_set != null) {
        one_img_set.style.display = "none";
    }
    if (counter == collection_array) {
        counter = 1;
        // console.log(counter)
        fatch_data(counter, data);
        buttons_set();
        up();
    }
    else {
        counter += 1;
        fatch_data(counter, data);
        buttons_set();
        up();
    }
}
const prev = () => {
    let data = document.getElementById("sarched_data").value;
    if (data == "") {
        data = "motivational";
    }
    if (one_img_set != null) {
        one_img_set.style.display = "none";
    }
    if (counter - 1 != 0) {

        counter -= 1;

        fatch_data(counter, data);
        buttons_set();
        up();
    }
}
const buttons_set = () => {
    btn.innerHTML = `
        <button onclick="prev()"
        class="border ml-2 text-white border-teal-500 text-teal-500 block rounded-sm font-bold py-4 px-6 mr-2 flex items-center hover:text-white">
        <svg class="h-5 w-5 mr-2 fill-current" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="-49 141 512 512"
            style="enable-background:new -49 141 512 512;" xml:space="preserve">
            <path id="XMLID_10_"
                d="M438,372H36.355l72.822-72.822c9.763-9.763,9.763-25.592,0-35.355c-9.763-9.764-25.593-9.762-35.355,0 l-115.5,115.5C-46.366,384.01-49,390.369-49,397s2.634,12.989,7.322,17.678l115.5,115.5c9.763,9.762,25.593,9.763,35.355,0 c9.763-9.763,9.763-25.592,0-35.355L36.355,422H438c13.808,0,25-11.193,25-25S451.808,372,438,372z">
            </path>
        </svg>
        Previous page ${counter - 1}
        </button>
        
        <button onclick="next()"
        class="border ml-auto mr-2 border-teal-500 bg-teal-500 text-white block rounded-sm font-bold py-4 px-6 ml-2 flex items-center">
        Next page ${counter + 1}
        <svg class="h-5 w-5 ml-2 fill-current" clasversion="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="-49 141 512 512"
            style="enable-background:new -49 141 512 512;" xml:space="preserve">
            <path id="XMLID_11_" d="M-24,422h401.645l-72.822,72.822c-9.763,9.763-9.763,25.592,0,35.355c9.763,9.764,25.593,9.762,35.355,0
            l115.5-115.5C460.366,409.989,463,403.63,463,397s-2.634-12.989-7.322-17.678l-115.5-115.5c-9.763-9.762-25.593-9.763-35.355,0
            c-9.763,9.763-9.763,25.592,0,35.355l72.822,72.822H-24c-13.808,0-25,11.193-25,25S-37.808,422-24,422z" />
        </svg>
        </button>
    `
    btn.classList.remove("hidden");
}

const set_data = (element) => {
    if (element['results'][0] == undefined) {
        alert("Result Not found..!");
        info.innerHTML = "Result Not found";
        reset();
        one_img_set.style.display = "";
    }
    else {
        info.innerHTML = `Current page - ${counter}`;
        let collect_imgs = "";
        content = element['results']
        element['results'].forEach((elements, index) => {
            let titles = elements['alt_description'];
            if (titles == null || titles == "") {
                titles = "Not found..!";
            }
            let collection_img = `
                        <div data-aos="fade-right" class="md:w-1/3 px-4 mb-8">
                        <a href="${elements['urls']['full']}" target="_blank">
                        <img class="rounded shadow-md"
                                    src="${elements['urls']['regular']}" alt="Image">

                        </a>
                                <div class="visible mt-4" id="title">
                                    <h5 class="text-gray-600">Title - ${titles} </h5>
                                    <h1>Likes - ${elements['likes']}</h1>
                                </div>
                        <button onclick="download(this)" value="${index}" class="w-1/2 mt-4 mb-9 bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ">
                                Download
                        </button>
                        <button onclick="full_view(this)" value="${index}" class="w-1/3 ml-4 mt-4 mb-9 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ">
                              Full View
                        </button>
                        </div>
                        `;
            // console.log(index)
            collect_imgs += collection_img;
        });
        imgs_set.innerHTML = collect_imgs;
        buttons_set();
    }
}

const set_sarch = (element) => {
    if (element['results'][0] == undefined) {
        alert("Result Not found..!");
        info.innerHTML = "Result Not found";
        reset();
        one_img_set.style.display = "";
    }
    else {
        info.innerHTML = `Current page - ${counter}`;
        let collect_imgs = "";
        content = element['results']
        element['results'].forEach((elements, index) => {
            let titles = elements['alt_description'];
            if (titles == null || titles == "") {
                titles = "Not found..!";
            }
            let collection_img = `
                        <div data-aos="fade-right" class="md:w-1/3 px-4 mb-8">
                        <a href="${elements['urls']['full']}" target="_blank">
                        <img class="rounded shadow-md"
                                    src="${elements['urls']['small']}" alt="Image">

                        </a>
                                <div class="visible mt-4" id="title">
                                    <h5>Title - ${titles} </h5>
                                    <h1>Likes - ${elements['likes']}</h1>
                                </div>
                        <button onclick="download(this)" value="${index}" class="w-1/2 mt-4 mb-9 bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ">
                                Download
                        </button>
                        <button onclick="full_view(this)" value="${index}" class="w-1/3 ml-4 mt-4 mb-9 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ">
                              Full View
                        </button>
                        </div>
                        `;
            // console.log(index)
            collect_imgs += collection_img;
        });
        imgs_set.innerHTML = collect_imgs;
        buttons_set();
    }
}

const up = () => {
    window.scroll(
        {
            top: 490,
            behavior: 'smooth'
        }
    );
};

const not_found_up = () => {
    window.scroll(
        {
            top: 0,
            behavior: 'smooth'
        }
    );
}
fatch_data(counter, 'motivational')

const reset = () => {
    up();
    if (one_img_set != null) {
        one_img_set.style.display = "none";
    }
    counter = 1;
    document.getElementById("sarched_data").value = "";
    fatch_sarch(counter, 'motivational')
    buttons_set();
}