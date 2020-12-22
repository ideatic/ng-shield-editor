import {Injectable} from '@angular/core';

@Injectable()
export class NgShieldMotifService {
  public readonly available = [
    // Bandas
    '<path %attrs% d="M 225.00 0.00 L 285.00 0.00 C 285.00 170.67 285.00 341.33 285.00 512.00 L 225.00 512.00 C 225.00 341.33 225.00 170.67 225.00 0.00 Z" />',
    '<path %attrs% d="M-31.025,12.4,11.4-30.025,541.025,499.6,498.6,542.025Z" />',
    '<path %attrs% d="M498.6-30.025,541.025,12.4,11.4,542.025-31.025,499.6Z"/>',
    '<path %attrs% d="M0,198.5c170.7,0,341.3,0,512,0v115c-170.7,0-341.3,0-512,0V198.5z"/>',
    // Líneas (cataluña)
    '<path %attrs% d="m 336,0 h 60 c 0,170.67 0,341.33 0,512 h -60 c 0,-170.67 0,-341.33 0,-512 z M 225,0 h 60 c 0,170.67 0,341.33 0,512 h -60 c 0,-170.67 0,-341.33 0,-512 z M 114,0 h 60 c 0,170.67 0,341.33 0,512 h -60 c 0,-170.67 0,-341.33 0,-512 z" />',
    // Cruz
    '<path %attrs% d="M 225.00 0.00 L 285.00 0.00 C 285.01 75.00 284.97 150.00 285.01 225.00 C 360.67 225.02 436.34 224.99 512.00 225.00 L 512.00 287.00 C 436.34 287.01 360.67 286.97 285.01 287.01 C 284.97 362.01 285.01 437.00 285.00 512.00 L 225.00 512.00 C 224.99 437.00 225.02 362.00 224.99 287.00 C 149.99 286.98 75.00 287.01 0.00 287.00 L 0.00 225.00 C 75.00 224.99 149.99 225.02 224.99 225.00 C 225.02 150.00 224.99 75.00 225.00 0.00 Z" />',
    // Mitad / mitad
    '<path %attrs% d="M 0.00 0.00 L 255.75 0.00 C 255.53 167.33 255.73 334.67 255.64 502.00 C 255.64 505.33 255.68 508.66 255.76 512.00 L 0.00 512.00 L 0.00 0.00 Z" />',
    // Cuartos
    '<path %attrs% d="m 0,256.02 c 85.07,-0.01 170.14,0.09 255.21,-0.04 0.85,3.95 0.36,8.01 0.45,12.02 0.1,81.33 -0.18,162.67 0.14,244 H 0 Z M 256.02,0 H 512 v 255.89 c -85.34,0.23 -170.69,-0.08 -256.03,0.15 C 256.06,170.69 255.95,85.35 256.02,0 Z" />',
    // Ying-yang
    '<path %attrs% d="M 391.15 37.78 C 395.75 39.95 399.57 43.39 403.74 46.25 C 417.63 56.13 430.78 67.10 442.35 79.64 C 462.70 101.23 479.68 126.07 491.87 153.15 C 498.43 170.03 505.09 187.05 508.20 204.97 C 509.22 210.57 509.44 216.42 512.00 221.61 L 512.00 279.45 C 508.83 288.07 508.44 297.35 506.21 306.21 C 505.05 310.90 503.54 315.49 502.09 320.10 C 497.27 337.30 489.73 353.61 481.29 369.30 C 473.16 384.01 463.01 397.44 452.62 410.60 C 439.36 426.00 424.36 439.89 408.13 452.11 C 396.74 460.29 385.29 468.50 372.74 474.82 C 338.45 494.28 299.84 505.29 260.81 509.80 C 258.55 510.12 256.47 511.10 254.39 512.00 L 198.54 512.00 C 192.30 509.51 185.54 508.95 179.20 506.79 C 161.16 500.91 143.96 491.93 129.73 479.27 C 118.42 469.05 109.27 456.74 100.97 444.03 C 90.91 428.14 85.06 409.76 83.32 391.09 C 83.01 380.48 82.54 369.67 85.14 359.29 C 86.68 352.61 87.90 345.81 90.45 339.41 C 97.03 322.96 106.63 307.71 118.96 294.96 C 128.40 284.42 140.48 276.81 152.44 269.46 C 171.99 259.00 193.75 252.09 216.05 251.69 C 237.10 250.74 258.49 248.80 278.38 241.36 C 294.44 234.89 310.14 226.81 323.09 215.14 C 335.92 204.42 346.52 191.20 354.60 176.59 C 375.52 143.44 386.66 104.75 389.78 65.85 C 391.09 56.55 390.59 47.13 391.15 37.78 Z" />',
    // Rallas
    `<polygon %attrs% points="293.866 512 512 176.901 512 124.57 259.804 512 293.866 512"/>
    <polygon %attrs% points="512 512 512 462.45 479.736 512 512 512"/>
    <polygon %attrs% points="469.821 512 512 447.208 512 394.86 435.754 512 469.821 512"/>
    <polygon %attrs% points="381.837 512 512 312.04 512 259.733 347.781 512 381.837 512"/>
    <polygon %attrs% points="363.235 0 329.144 0 0 505.643 0 512 29.934 512 363.235 0"/>
    <polygon %attrs% points="337.854 512 512 244.456 512 192.127 303.782 512 337.854 512"/>
    <polygon %attrs% points="285.17 0 0 438.087 0 490.42 319.229 0 285.17 0"/>
    <polygon %attrs% points="241.164 0 0 370.497 0 422.835 275.239 0 241.164 0"/>
    <polygon %attrs% points="425.827 512 512 379.611 512 327.286 391.752 512 425.827 512"/>
    <polygon %attrs% points="0 0 0 17.387 11.318 0 0 0"/>
    <polygon %attrs% points="21.237 0 0 32.627 0 84.953 55.308 0 21.237 0"/>
    <polygon %attrs% points="65.234 0 0 100.213 0 152.549 99.3 0 65.234 0"/>
    <polygon %attrs% points="197.194 0 0 302.944 0 355.282 231.259 0 197.194 0"/>
    <polygon %attrs% points="153.207 0 0 235.367 0 287.672 187.263 0 153.207 0"/>
    <polygon %attrs% points="109.213 0 0 167.781 0 220.111 143.283 0 109.213 0"/>
    <polygon %attrs% points="161.901 512 495.177 0 461.128 0 127.84 512 161.901 512"/>
    <polygon %attrs% points="117.914 512 451.19 0 417.141 0 83.849 512 117.914 512"/>
    <polygon %attrs% points="73.914 512 407.201 0 373.146 0 39.865 512 73.914 512"/>
    <polygon %attrs% points="205.884 512 512 41.75 512 0 505.101 0 171.818 512 205.884 512"/>
    <polygon %attrs% points="249.881 512 512 109.311 512 56.986 215.807 512 249.881 512"/>`
  ];
}
