function mod(n, m) {
    const remain = n % m;
    return Math.floor(remain >= 0 ? remain : remain + m);
}

$.getJSON("/data.json", (data) => {
    const { events, projects } = data;

    // Timeline events
    const dates = $("#about-me-timeline");
    const card = $("#about-me-card");
    let eventSelected = 0;
    $("#about-me-card-title").text(events[0].title);
    $("#about-me-card-description").text(events[0].description);
    $("#about-me-card-img").css("background-image", `url(${events[0].img})`);
    card.on("click", e => {
        if (window.innerWidth < 700) {
            const i = mod(e.pageX > window.innerWidth/2 ? eventSelected+1 : eventSelected-1, events.length);
            if (i !== eventSelected) {
                eventSelected = i;
                card.css("opacity", 0);
                setTimeout(() => {
                    $("#about-me-card-title").text(events[i].title);
                    $("#about-me-card-description").text(events[i].description);
                    $("#about-me-card-img").css("background-image", `url(${events[i].img})`);
                    card.css("opacity", 1);
                }, 250);
            }
        }
    });
    for (let i = 0; i < events.length; i++) {
        const elt = $(`<time ${(i === 0) ? "selected" : ""}>${events[i].date}</time>`);
        dates.append(elt);
        $("#preload").append(`<img alt="" src="${events[i].img}">`);
        elt.on("click", () => {
            if (i !== eventSelected) {
                for (const e of $("#about-me-timeline time")) {
                    $(e).removeAttr("selected");
                }
                elt.attr("selected", "");
                eventSelected = i;
                card.css("opacity", 0);
                setTimeout(() => {
                    $("#about-me-card-title").text(events[i].title);
                    $("#about-me-card-description").text(events[i].description);
                    $("#about-me-card-img").css("background-image", `url(${events[i].img})`);
                    card.css("opacity", 1);
                }, 250);
            }
        });
    }

    // Projects
    const projectsElt = $("#projects-inside");
    let projectSelected = 0;
    for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        const elt = $(`<div id="project-${i}" class="project${i === 0 ? ' selected' : ''}">
                            <div class="top" style="background-image: url('${project.img}');"></div>
                            <aside class="side-text">${project.title} - ${project.subtitle}</aside>
                            <article class="middle">
                                <h1>${project.title}</h1>
                                <h2>${project.subtitle}</h2>
                                <p>${project.description}</p>
                                <a href="${project.url}"><i class="gg-display-flex"></i> Lien vers le projet</a>
                                <br>
                                <a href="${project.code_url}"><i class="gg-terminal"></i> Lien vers le code</a>
                            </article>
                            <div style="background: ${project.color}; grid-area: d;"></div>
                        </div>`);
        projectsElt.append(elt);
        $("#preload").append(`<img alt="" src="${project.img}">`);
        elt.on("click", () => {
            if (i !== projectSelected) {
                $(`#project-${i} .side-text`).css("opacity", 0);
                $(`#project-${i} .middle`).css("opacity", 0);
                $(`#project-${i} .top`).css("opacity", 0);
                $(`#project-${projectSelected} .side-text`).css("opacity", 0);
                $(`#project-${projectSelected} .middle`).css("opacity", 0);
                $(`#project-${projectSelected} .top`).css("opacity", 0);
                setTimeout(() => {
                    for (const e of projectsElt.children()) {
                        e.className = "project";
                    }
                    elt.attr("class", "project selected");
                    setTimeout(() => {
                        $(`#project-${i} .side-text`).css("opacity", 1);
                        $(`#project-${i} .middle`).css("opacity", 1);
                        $(`#project-${i} .top`).css("opacity", 1);
                        $(`#project-${projectSelected} .side-text`).css("opacity", 1);
                        $(`#project-${projectSelected} .middle`).css("opacity", 1);
                        $(`#project-${projectSelected} .top`).css("opacity", 1);
                        projectSelected = i;
                    }, 500);
                }, 250);
            }
        });
    }
});