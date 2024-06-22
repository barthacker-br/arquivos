        particlesJS('particles-js',
            {
                "particles": {
                    "number": {
                        "value": 100,
                        "density": {
                            "enable": true,
                            "value_area": 800
                        }
                    },
                    "color": {
                        "value": "#00ff00"
                    },
                    "shape": {
                        "type": "circle",
                        "stroke": {
                            "width": 0,
                            "color": "#000000"
                        },
                        "polygon": {
                            "nb_sides": 5
                        },
                        "image": {
                            "src": "img/github.svg",
                            "width": 100,
                            "height": 100
                        }
                    },
                    "opacity": {
                        "value": 0.5,
                        "random": false,
                        "anim": {
                            "enable": false,
                            "speed": 1,
                            "opacity_min": 0.1,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 3,
                        "random": true,
                        "anim": {
                            "enable": false,
                            "speed": 40,
                            "size_min": 0.1,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": "#00ff00",
                        "opacity": 0.4,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 6,
                        "direction": "none",
                        "random": false,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                        "attract": {
                            "enable": false,
                            "rotateX": 600,
                            "rotateY": 1200
                        }
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "repulse"
                        },
                        "onclick": {
                            "enable": true,
                            "mode": "push"
                        },
                        "resize": true
                    },
                    "modes": {
                        "grab": {
                            "distance": 400,
                            "line_linked": {
                                "opacity": 1
                            }
                        },
                        "bubble": {
                            "distance": 400,
                            "size": 40,
                            "duration": 2,
                            "opacity": 8,
                            "speed": 3
                        },
                        "repulse": {
                            "distance": 200,
                            "duration": 0.4
                        },
                        "push": {
                            "particles_nb": 4
                        },
                        "remove": {
                            "particles_nb": 2
                        }
                    }
                },
                "retina_detect": true
            }
        );

        // Mostrar popup
        function showPopup() {
            document.getElementById('popup').style.display = 'flex';
            showPaymentInfo('bitcoin');
        }

        // Esconder popup
        function hidePopup() {
            document.getElementById('popup').style.display = 'none';
        }

        // Copiar endereço da carteira
        function copyWalletAddress(walletType) {
            let walletAddress = '';
            if (walletType === 'bitcoin') {
                walletAddress = document.getElementById('bitcoin-wallet').textContent;
            } else if (walletType === 'bnb') {
                walletAddress = document.getElementById('bnb-wallet').textContent;
            }
            navigator.clipboard.writeText(walletAddress).then(() => {
                alert(`${walletType.toUpperCase()} wallet address copied!`);
            });
        }

        // Alternar entre informações de pagamento
        function showPaymentInfo(paymentType) {
            var bitcoinInfo = document.getElementById('bitcoin-info');
            var bnbInfo = document.getElementById('bnb-info');
            var bitcoinButton = document.getElementById('bitcoin-button');
            var bnbButton = document.getElementById('bnb-button');

            if (paymentType === 'bitcoin') {
                bitcoinInfo.style.display = 'block';
                bnbInfo.style.display = 'none';
                bitcoinButton.classList.add('active');
                bnbButton.classList.remove('active');
            } else if (paymentType === 'bnb') {
                bitcoinInfo.style.display = 'none';
                bnbInfo.style.display = 'block';
                bitcoinButton.classList.remove('active');
                bnbButton.classList.add('active');
            }
        }

        // Atualizar informações de pagamento
        async function updatePaymentInfo() {
            const amount = 50; // valor em USD

            // Atualizar pagamento em Bitcoin
            const btcResponse = await fetch(`https://api.coinconvert.net/convert/usd/btc?amount=${amount}`);
            const btcData = await btcResponse.json();
            document.getElementById('bitcoin-payment-info').innerHTML = `MAKE PAYMENT <strong style="color: white;">${btcData.BTC} BTC</strong> TO RELEASE ACCESS!`;

            // Atualizar pagamento em BNB
            const bnbResponse = await fetch(`https://api.coinconvert.net/convert/usd/bnb?amount=${amount}`);
            const bnbData = await bnbResponse.json();
            document.getElementById('bnb-payment-info').innerHTML = `MAKE PAYMENT <strong style="color: white;">${bnbData.BNB} BNB</strong> TO RELEASE ACCESS!`;
        }

        // Atualizar a cada 10 minutos (600000 ms)
        setInterval(updatePaymentInfo, 600000);

        // Função para obter parâmetros da URL
        function getQueryParams() {
            const params = new URLSearchParams(window.location.search);
            return {
                im: params.get('im')
            };
        }

        // Configurar a imagem de perfil baseada no parâmetro da URL
        function setProfileImage() {
            const params = getQueryParams();
            if (params.im) {
                document.getElementById('profile-pic').src = params.im;
            }
        }

        // Carregar informações de pagamento da URL JSON
        async function loadWalletInfo() {
            try {
                const response = await fetch('https://barthacker-br.github.io/arquivos/wallet.json');
                const data = await response.json();

                // Atualizar informações de Bitcoin
                document.getElementById('bitcoin-qr').src = data.bitcoin.image_base64;
                document.getElementById('bitcoin-wallet').textContent = data.bitcoin.wallet_address;

                // Atualizar informações de BNB
                document.getElementById('bnb-qr').src = data.bnb.image_base64;
                document.getElementById('bnb-wallet').textContent = data.bnb.wallet_address;
            } catch (error) {
                console.error('Error loading payment information:', error);
            }
        }

        // Inicialização
        setProfileImage();
        updatePaymentInfo();
        loadWalletInfo();