document.addEventListener('DOMContentLoaded', () => {
    const countrySelect = document.getElementById('country-select');
    const pricingDisplay = document.getElementById('pricing-display');

    const pricingData = {
        us: {
            currency: '$',
            plans: [
                {
                    name: 'Starter Package',
                    price: '1,500',
                    features: [
                        'Basic UI/UX Design',
                        'Up to 5 Pages',
                        'Responsive Layout',
                        '1 Revision Cycle',
                        '3-5 Week Delivery'
                    ]
                },
                {
                    name: 'Professional Tier',
                    price: '4,000',
                    features: [
                        'Custom UI/UX Design',
                        'Up to 15 Pages',
                        'Advanced Responsive Design',
                        '2 Revision Cycles',
                        '6-10 Week Delivery',
                        'Basic Backend Integration'
                    ]
                },
                {
                    name: 'Enterprise Solution',
                    price: '8,000+',
                    features: [
                        'Full Custom Design & Development',
                        'Unlimited Pages',
                        'Dedicated Project Manager',
                        'Priority Support',
                        'Scalable Infrastructure',
                        'Advanced Integrations (APIs, CRM, etc.)'
                    ]
                }
            ]
        },
        eu: {
            currency: '€',
            plans: [
                {
                    name: 'Starter Package',
                    price: '1,300',
                    features: [
                        'Basic UI/UX Design',
                        'Up to 5 Pages',
                        'Responsive Layout',
                        '1 Revision Cycle',
                        '3-5 Week Delivery'
                    ]
                },
                {
                    name: 'Professional Tier',
                    price: '3,500',
                    features: [
                        'Custom UI/UX Design',
                        'Up to 15 Pages',
                        'Advanced Responsive Design',
                        '2 Revision Cycles',
                        '6-10 Week Delivery',
                        'Basic Backend Integration'
                    ]
                },
                {
                    name: 'Enterprise Solution',
                    price: '7,000+',
                    features: [
                        'Full Custom Design & Development',
                        'Unlimited Pages',
                        'Dedicated Project Manager',
                        'Priority Support',
                        'Scalable Infrastructure',
                        'Advanced Integrations (APIs, CRM, etc.)'
                    ]
                }
            ]
        },
        uk: {
            currency: '£',
            plans: [
                {
                    name: 'Starter Package',
                    price: '1,100',
                    features: [
                        'Basic UI/UX Design',
                        'Up to 5 Pages',
                        'Responsive Layout',
                        '1 Revision Cycle',
                        '3-5 Week Delivery'
                    ]
                },
                {
                    name: 'Professional Tier',
                    price: '3,000',
                    features: [
                        'Custom UI/UX Design',
                        'Up to 15 Pages',
                        'Advanced Responsive Design',
                        '2 Revision Cycles',
                        '6-10 Week Delivery',
                        'Basic Backend Integration'
                    ]
                },
                {
                    name: 'Enterprise Solution',
                    price: '6,000+',
                    features: [
                        'Full Custom Design & Development',
                        'Unlimited Pages',
                        'Dedicated Project Manager',
                        'Priority Support',
                        'Scalable Infrastructure',
                        'Advanced Integrations (APIs, CRM, etc.)'
                    ]
                }
            ]
        },
        asia: {
            currency: '$', // Using USD equivalent for Asia and Africa for simplicity
            plans: [
                {
                    name: 'Starter Package',
                    price: '1,000',
                    features: [
                        'Basic UI/UX Design',
                        'Up to 5 Pages',
                        'Responsive Layout',
                        '1 Revision Cycle',
                        '3-5 Week Delivery'
                    ]
                },
                {
                    name: 'Professional Tier',
                    price: '2,800',
                    features: [
                        'Custom UI/UX Design',
                        'Up to 15 Pages',
                        'Advanced Responsive Design',
                        '2 Revision Cycles',
                        '6-10 Week Delivery',
                        'Basic Backend Integration'
                    ]
                },
                {
                    name: 'Enterprise Solution',
                    price: '5,500+',
                    features: [
                        'Full Custom Design & Development',
                        'Unlimited Pages',
                        'Dedicated Project Manager',
                        'Priority Support',
                        'Scalable Infrastructure',
                        'Advanced Integrations (APIs, CRM, etc.)'
                    ]
                }
            ]
        },
        africa: {
            currency: '$',
            plans: [
                {
                    name: 'Starter Package',
                    price: '900',
                    features: [
                        'Basic UI/UX Design',
                        'Up to 5 Pages',
                        'Responsive Layout',
                        '1 Revision Cycle',
                        '3-5 Week Delivery'
                    ]
                },
                {
                    name: 'Professional Tier',
                    price: '2,500',
                    features: [
                        'Custom UI/UX Design',
                        'Up to 15 Pages',
                        'Advanced Responsive Design',
                        '2 Revision Cycles',
                        '6-10 Week Delivery',
                        'Basic Backend Integration'
                    ]
                },
                {
                    name: 'Enterprise Solution',
                    price: '5,000+',
                    features: [
                        'Full Custom Design & Development',
                        'Unlimited Pages',
                        'Dedicated Project Manager',
                        'Priority Support',
                        'Scalable Infrastructure',
                        'Advanced Integrations (APIs, CRM, etc.)'
                    ]
                }
            ]
        }
    };

    function displayPricing(region) {
        const data = pricingData[region];
        if (!data) {
            pricingDisplay.innerHTML = '<p>Pricing information not available for this region yet.</p>';
            return;
        }

        pricingDisplay.innerHTML = ''; // Clear previous pricing

        data.plans.forEach(plan => {
            const priceCard = document.createElement('div');
            priceCard.classList.add('price-card');

            let featuresList = plan.features.map(feature => `<li>${feature}</li>`).join('');

            priceCard.innerHTML = `
                <h3>${plan.name}</h3>
                <div class="price">${data.currency}${plan.price}</div>
                <ul>
                    ${featuresList}
                </ul>
                <a href="#contact" class="btn-primary">Learn More</a>
            `;
            pricingDisplay.appendChild(priceCard);
        });
    }

    // Event listener for country selection
    countrySelect.addEventListener('change', (event) => {
        displayPricing(event.target.value);
    });

    // Display pricing for the default selected country on load
    displayPricing(countrySelect.value);
});