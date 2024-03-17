import React from "react";

function FooterSection() {
    return (
        <footer className="mastfoot mt-auto text-center">
            <div className="image">
                <img src="/img/HogarPro_Logo.png" style={{ maxWidth: "130px" }} />
            </div>
            <div className="copyrights">
                <p style={{ marginBottom: 0 }}>Universidad del Valle © 2024, All Rights Reserved
                    <br />
                    <span>Web Design By: Univalle Students</span>
                </p>
            </div>
        </footer>
    );
}

export default FooterSection;