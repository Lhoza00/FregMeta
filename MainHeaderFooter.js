class SpecialHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = 
        `
        <header class="header">
            <div class="container">
                <div class="logoContainer">
                    <a href="Index.html" class="Logo"><span><img src="favIcon/favicon-32x32.png" alt="FregMeta Logo"></span>
                    FregMeta</a>
                </div> 
                <nav class="navbar">
                    <a href="Product.html">Product</a>
                    <a href="Games.html">Games</a>
                    <a href="Contact.html">Contact</a> 
                    <a href="Cart.html"><i class="fa-solid fa-cart-shopping"></i></a>   
                </nav>
                <div id="menu-btn" class="fas fa-bars"></div> 
            </div>
        </header>
        `
    }
}

class SpecialFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML =
        `
        <footer>
            <div class="container">
                <div class="topfooter">
                    
                    <a href="index.html" class="Logo">FregMeta</a> 
                    <div class="socials">
                        <i href="#" class="fab fa-facebook-f"></i>
                        <i class="fab fa-youtube"></i>
                        <i class="fab fa-twitter"></i>
                        <i class="fab fa-instagram"></i>
                    </div>
                </div>
                <hr/>
                <div class="footlinks">
                    <div id="copyright">
                        <p>©2025 FregMeta</p>
                    </div>
                    <div id="T_C">
                        <a href="Product.html">Product</a>
                        <a href="Games.html">Games</a>
                        <a href="Contact.html">Help</a>
                    </div>
                </div>
            </div>
        </footer>
        `
    }
}

customElements.define(`special-header`, SpecialHeader)
customElements.define(`special-footer`, SpecialFooter)