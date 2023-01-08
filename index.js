// decide current step
let currentStep = 1;

// saves user data
const userData = {
    billingType: 0,
    billingPlan: 0,
    plan: 0,
    addOns:{
        1: true
    }
};

// navbar options
const navbarOptions = [
    {
        id: 1,
        optionText: "Your Info"
    },

    {
        id: 2,
        optionText: "Select Plan"
    },

    {
        id: 3,
        optionText: "Add-Ons"
    },

    {
        id: 4,
        optionText: "Summary"
    },
]

// data for billing plans
const billingPlans = [
    {
        id: 0,
        title: "Arcade",
        image: "assets/images/icon-arcade.svg",
        billMonthly: "9",
        billYearly: "90",
        benifitsYearly: "2 months free"
    },

    {
        id: 1,
        title: "Advanced",
        image: "assets/images/icon-advanced.svg",
        billMonthly: "12",
        billYearly: "120",
        benifitsYearly: "2 months free"
    },

    {
        id: 2,
        title: "Pro",
        image: "assets/images/icon-pro.svg",
        billMonthly: "15",
        billYearly: "150",
        benifitsYearly: "2 months free"
    }
]

// data for add-ons options
const addOnsOptions = [
    {
        id: 0,
        title: "Online Service",
        description: "Access to multiplayer games.",
        billMonthly: "1",
        billYearly: "10"
    },

    {
        id: 1,
        title: "Larger Storage",
        description: "Extra 1TB of cloud save.",
        billMonthly: "2",
        billYearly: "20"
    },

    {
        id: 2,
        title: "Customizable Profile",
        description: "Custom theme on your profile.",
        billMonthly: "2",
        billYearly: "20"
    }
]

// content map
const contentData = {
    1: `
        <div class="page-main-content">
            <h2 class="content-head-text">Personal info</h2>
            <p class="content-text">Please enter your name, email address, and phone number.</p>

            <p class="content-head-text">Name</p>
            <input class="content-textfield" type="text" placeholder="e.g. Stephen King"/>

            <p class="content-head-text">Email Address</p>
            <input class="content-textfield" type="email" placeholder="e.g. stephenking@lorem.com"/>

            <p class="content-head-text">Phone Number</p>
            <input class="content-textfield" type="tel" placeholder="+1 234 567 890"/>
        <div>

        <button class="content-button" onClick="nextClick(1)">
            Next Step
        </button>
    `,
    
    2: `
        <div class="page-main-content">
            <h2 class="content-head-text">Select your plan</h2>
            <p class="content-text">You have the option of monthly or yearly billing.</p>

            <div id="billing-card-holder"></div>

            <div class="billing-type-selector-container">
                <span class=${userData.billingType === 0 ? "selected-bill-type" : "non-selected-bill-type"} id="billing-choice-monthly-text">
                    Monthly
                </span>

                <label class="switch">
                    <input id="billing-type-selector" type="checkbox" onChange="billingTypeChange()">
                    <span class="slider round"></span>
                </label>

                <span class=${userData.billingType === 1 ? "selected-bill-type" : "non-selected-bill-type"} id="billing-choice-yearly-text">
                    Yearly
                </span>
            </div>
        <div>

        <button class="content-button-prev" onClick="nextClick(-1)">
            Go Back
        </button>

        <button class="content-button" onClick="nextClick(1)">
            Next Step
        </button>
    `,

    3: `
        <div class="page-main-content">
            <h2 class="content-head-text">Pick add-ons</h2>
            <p class="content-text">Add-ons help enhance your gaming experience.</p>

            <div id="addons-card-holder"></div>


        <div>

        <button class="content-button-prev" onClick="nextClick(-1)">
            Go Back
        </button>

        <button class="content-button" onClick="nextClick(1)">
            Next Step
        </button>
    `,

    4: `
    <div class="page-main-content">
        <h2 class="content-head-text">Summary</h2>
        <p class="content-text">Double check everythong looks OK before confirming.</p>

        <div class="summary-parent">
            <div class="summary-holder">
                <div id="summary-plan-selection"></div>
                <div id="add-ons-selection"></div>
            </div>

            <div id="summary-total"></div>
        <div>

    <button class="content-button-prev" onClick="nextClick(-1)">
        Go Back
    </button>

    <button class="content-button submit-button">
        Submit
    </button>
`
}

// function to load navbar with navOptions
const loadNavbar = () => {
    // retreive navbar
    const navbar = document.getElementById("navbar");

    // create navbar data
    const navbarData = navbarOptions.map((entry) => {
        return(
            `<div class="nav-item" key=${entry.id}>
                <button class=${`${currentStep === entry.id ? "navbar-button-active" : "navbar-button"}`}>
                    ${entry.id}
                </button>

                <span class="navbar-option-description">
                    <p class="navbar-option-description-title">Step ${entry.id}</p=>
                    <p class="navbar-option-description-text">${entry.optionText}</p>
                </span>
            </nav>`
        )
    })

    // set navbar
    navbarData.forEach((entry) => {
        navbar.innerHTML = navbar.innerHTML + entry;
    })
    
}
// function to load pricing cards
const loadPlanCards = () => {
    const billingCardHolder = document.getElementById("billing-card-holder");

    // get billing data
    const billingData = billingPlans.map((entry) => {
        return `
            <div key=${entry.id} class="plan-card ${entry.id === userData.plan ? "selected-card" : ""}" onClick="planSelected(${entry.id})">
                <img class="plan-card-image" src=${entry.image} alt=${entry.title}/>

                <div class="plan-card-details">
                    <h4 class="blueText">${entry.title}</h4>
                    ${userData.billingType === 0 ? `<p class="greyText">$${entry.billMonthly}/mo</p>` : 
                    `<div>
                        <p class="greyText">$${entry.billYearly}/yr</p>
                        <p class="blueText">${entry.benifitsYearly}</p>
                    </div>
                </div>`
            }
            </div>
        `
    })

    // clear existing data
    billingCardHolder.innerHTML = "";

    // load data
    billingData.forEach((entry) => {
        billingCardHolder.innerHTML = billingCardHolder.innerHTML + entry;
    })
}

// function to load add-on cards
const loadAddOnCards = () => {
    const addOnCardHolder = document.getElementById("addons-card-holder");

    // get data on addOnCards
    const addOnCardData = addOnsOptions.map((entry) => {
        return(
            `
                <div class="add-on-card ${userData.addOns[entry.id] ? "selected-card": ""}" key=${entry.id}>
                    <div class="add-on-card-main">
                        <input id="add-on-card-selector-${entry.id}" type="checkbox" ${userData.addOns[entry.id] ? `checked="true"`: ""} onChange="addOnSelect(${entry.id})" />

                        <div class="add-on-card-description">
                            <h4 class="blueText">${entry.title}</h4>
                            <p class="greyText">${entry.description}</p>
                        </div>
                    </div>

                    <p class="blueText">$${userData.billingType == 0 ? entry.billMonthly: entry.billYearly}/${userData.billingType == 0 ? "mo" : "yr"}</p>
                </div>
            `
        )
    })

    // clear addOnCardHolder
    addOnCardHolder.innerHTML = "";

    // set data in addons holder
    addOnCardData.forEach((entry) => {
        addOnCardHolder.innerHTML = addOnCardHolder.innerHTML + entry;
    })
}

// function to transition to the next step
const nextClick = (step) => {
    currentStep += step;

    // clear navbar
    navbar.innerHTML = "";

    // reload navbar
    loadNavbar();

    // load the content of the current page
    document.getElementById("content").innerHTML = contentData[currentStep];

    // load pricing cards for step 2
    if(currentStep === 2){
        loadPlanCards();
    }

    // load addon cards for step 3
    if(currentStep === 3){
        loadAddOnCards();
    }

    // load summary for step 4
    if(currentStep === 4){
        loadSummary();
    }
}


// function to run when body is loaded
const loadHandler = () => {
    // load the navbar
    loadNavbar();

    // load the content of page 1
    document.getElementById("content").innerHTML = contentData[1];
}

// function to change billing type
const billingTypeChange = () => {
    const yearlyText = document.getElementById("billing-choice-yearly-text");
    const monthlyText = document.getElementById("billing-choice-monthly-text");
    const selection = document.getElementById("billing-type-selector").checked;

    userData.billingType = selection ? 1 : 0;

    if(selection){
        yearlyText.className = "selected-bill-type";
        monthlyText.className = "non-selected-bill-type"
    }  
    else{
        yearlyText.className = "non-selected-bill-type";
        monthlyText.className = "selected-bill-type"
    }

    // reload pricing data
    loadPlanCards();
}

// function to set selected plan
const planSelected = (id) => {
    // set new plan
    userData.plan = id;

    // reload the plan cards
    loadPlanCards();
}

// function to adjust addons
const addOnSelect = (id) => {
    const addOnCard = document.getElementById(`add-on-card-selector-${id}`);
    
    // update userData
    userData.addOns[id] = addOnCard.checked;

    // load cards again
    loadAddOnCards();
}

// function to load summary
const loadSummary = () => {
    // load plan data
    const summaryPlanSelection = document.getElementById("summary-plan-selection");

    summaryPlanSelection.innerHTML = `
        <div>
            <p class="blueText boldText">${[billingPlans[userData.billingPlan].title]} (${userData.billingType ? "Yesrly" : "Monthly"})</p>

            <p class="greyText link">
                Change
            </p>
        </div>

        <span class="blueText boldText">
            $${userData.billingType ? `${billingPlans[userData.billingPlan].billYearly}/yr` : `${billingPlans[userData.billingPlan].billMonthly}/mo`}
        </span>
    `

    // load add-ons
    const addOnsSelection = document.getElementById("add-ons-selection");

    const addOnsCards = Object.keys(userData.addOns).map((entry) => {
        // if value is false then return empty
        if(!userData.addOns[entry]){
            return "";
        }

        return `
            <div class="summary-add-on-card">
                <span class="greyText">
                    ${addOnsOptions[entry].title}
                </span>

                <span class="blueText">
                $${userData.billingType ? `${addOnsOptions[entry].billYearly}/yr` : `${addOnsOptions[entry].billMonthly}/mo` }
                </span>
            </div>
        `
    })

    // cleat addons
    addOnsSelection.innerHTML = "";

    // load cards
    addOnsCards.forEach((entry) => {
        addOnsSelection.innerHTML = addOnsSelection.innerHTML + entry;
    })

    // display total
    const summaryTotal = document.getElementById("summary-total");

    // calculate total
    let total;

    if(userData.billingType){
        // for yearly payment
        // add plan value
        total = parseInt(billingPlans[userData.billingPlan].billYearly);

        // add addOns
        Object.keys(userData.addOns).forEach((entry) => {
            // userData.addOns for any entry is false return
            if(! userData.addOns[entry]){
                return;
            }

            total += parseInt(addOnsOptions[entry].billYearly);
        }) 
    }
    else{
        // for monthly billing
        // add plan value
        total = parseInt(billingPlans[userData.billingPlan].billMonthly);

        // add addOns
        Object.keys(userData.addOns).forEach((entry) => {
            // userData.addOns for any entry is false return
            if(! userData.addOns[entry]){
                return;
            }

            total += parseInt(addOnsOptions[entry].billMonthly);
        }) 
    }

    // display
    summaryTotal.innerHTML = `
        <span class="greyText">
            Total (per ${userData.billingType ? "Year" : "Month"})
        </span>

        <span class="blueText boldText">
            $${userData.billingType ? `${total}/yr` : `${total}/mo`}
        </span>
    `
}