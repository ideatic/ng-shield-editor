import { Injectable } from '@angular/core';

@Injectable()
export class NgShieldMotifService {
  public readonly available = [
    '<path %attrs% d="M 225.00 0.00 L 285.00 0.00 C 285.00 170.67 285.00 341.33 285.00 512.00 L 225.00 512.00 C 225.00 341.33 225.00 170.67 225.00 0.00 Z" />',
    '<path %attrs% d="m 336,0 h 60 c 0,170.67 0,341.33 0,512 h -60 c 0,-170.67 0,-341.33 0,-512 z M 225,0 h 60 c 0,170.67 0,341.33 0,512 h -60 c 0,-170.67 0,-341.33 0,-512 z M 114,0 h 60 c 0,170.67 0,341.33 0,512 h -60 c 0,-170.67 0,-341.33 0,-512 z" />',
    '<path %attrs% d="M 225.00 0.00 L 285.00 0.00 C 285.01 75.00 284.97 150.00 285.01 225.00 C 360.67 225.02 436.34 224.99 512.00 225.00 L 512.00 287.00 C 436.34 287.01 360.67 286.97 285.01 287.01 C 284.97 362.01 285.01 437.00 285.00 512.00 L 225.00 512.00 C 224.99 437.00 225.02 362.00 224.99 287.00 C 149.99 286.98 75.00 287.01 0.00 287.00 L 0.00 225.00 C 75.00 224.99 149.99 225.02 224.99 225.00 C 225.02 150.00 224.99 75.00 225.00 0.00 Z" />',
    '<path %attrs% d="M0,198.5c170.7,0,341.3,0,512,0v115c-170.7,0-341.3,0-512,0V198.5z"/>',
    '<path %attrs% d="M 0.00 0.00 L 255.75 0.00 C 255.53 167.33 255.73 334.67 255.64 502.00 C 255.64 505.33 255.68 508.66 255.76 512.00 L 0.00 512.00 L 0.00 0.00 Z" />',
    '<path %attrs% d="m 0,256.02 c 85.07,-0.01 170.14,0.09 255.21,-0.04 0.85,3.95 0.36,8.01 0.45,12.02 0.1,81.33 -0.18,162.67 0.14,244 H 0 Z M 256.02,0 H 512 v 255.89 c -85.34,0.23 -170.69,-0.08 -256.03,0.15 C 256.06,170.69 255.95,85.35 256.02,0 Z" />',
    // Pruebas yin yang
    '<path %attrs% d="M 272.09 2.10 C 291.43 6.91 310.35 13.24 328.65 21.14 C 353.15 30.64 376.64 42.80 398.28 57.72 C 415.90 69.33 432.19 82.97 446.55 98.43 C 459.67 110.95 470.00 125.95 480.08 140.92 C 487.61 153.64 494.81 166.67 499.47 180.76 C 502.90 191.67 507.39 202.37 508.91 213.78 C 509.71 217.53 510.72 221.24 512.00 224.86 L 512.00 278.23 C 508.58 287.04 508.38 296.66 505.36 305.58 C 502.76 313.29 499.99 320.94 497.35 328.64 C 489.42 346.47 480.29 363.90 468.50 379.52 C 449.63 404.41 426.76 426.31 400.98 443.95 C 368.90 466.05 333.10 482.66 295.76 493.63 C 274.63 500.01 253.02 504.96 231.05 507.34 C 220.55 509.35 209.69 508.92 199.38 512.00 L 139.90 512.00 C 135.57 511.16 131.40 509.61 127.01 509.10 C 105.20 505.37 84.30 497.06 65.44 485.56 C 50.34 476.48 38.27 463.45 26.68 450.38 C 14.18 435.18 6.15 416.54 2.35 397.31 C -0.10 386.70 0.05 375.53 2.58 364.95 C 4.78 354.02 8.20 343.29 13.20 333.30 C 17.90 324.36 24.20 316.42 30.56 308.61 C 39.98 297.86 51.19 288.73 63.41 281.34 C 86.78 266.81 113.43 257.51 140.78 254.45 C 147.15 253.62 153.50 252.45 159.94 252.52 C 167.02 252.68 173.91 250.64 180.97 250.54 C 197.19 250.66 213.32 247.85 228.96 243.71 C 246.73 238.07 264.36 231.33 280.01 221.01 C 292.45 212.80 304.17 203.28 313.89 191.93 C 317.87 186.88 321.50 181.56 325.21 176.31 C 331.16 167.60 334.93 157.66 338.77 147.90 C 343.19 135.82 344.75 122.77 344.03 109.96 C 343.55 99.41 340.13 89.31 336.58 79.46 C 323.89 47.67 299.55 21.87 272.09 2.10 Z" />',
    '<path %attrs% d="M 272.98 85.90 C 285.31 88.31 296.73 93.84 308.14 98.88 C 353.64 118.93 393.29 154.34 414.03 199.98 C 418.77 210.96 423.28 222.21 425.07 234.10 C 427.65 241.08 427.90 248.62 428.84 255.93 C 429.07 272.06 429.80 288.59 425.56 304.28 C 422.46 320.25 416.57 335.62 408.98 350.00 C 389.01 387.25 356.36 416.95 318.72 435.76 C 290.45 450.44 259.07 458.66 227.45 461.65 C 218.40 463.33 209.16 462.94 200.00 462.98 C 167.45 464.18 133.92 450.16 113.81 424.16 C 102.71 411.25 94.50 395.39 92.31 378.42 C 90.64 373.43 91.47 368.14 91.27 362.99 C 91.13 359.81 91.34 356.62 92.34 353.58 C 95.02 334.61 104.80 316.86 118.54 303.54 C 126.74 295.11 136.67 288.57 147.03 283.11 C 155.21 278.91 164.09 276.48 172.84 273.80 C 178.88 272.23 185.17 272.06 191.21 270.49 C 196.18 270.19 201.21 270.73 206.08 269.41 C 242.86 269.37 280.19 251.88 301.14 221.15 C 306.48 213.17 310.85 204.50 313.40 195.21 C 319.06 181.22 319.11 165.40 316.05 150.77 C 315.00 147.88 313.78 145.04 312.99 142.07 C 306.81 123.82 295.10 107.93 281.57 94.43 C 278.85 91.47 274.94 89.45 272.98 85.90 Z" />',
    '<path %attrs% d="M 354.21 85.04 C 369.70 88.89 384.23 95.65 398.66 102.34 C 439.80 122.36 475.56 155.04 495.44 196.61 C 504.29 214.48 509.15 233.99 512.00 253.64 L 512.00 284.40 C 509.05 310.65 500.79 336.41 486.86 358.92 C 468.09 389.71 440.51 414.70 408.98 431.97 C 379.80 448.23 347.14 457.84 313.96 461.28 C 307.34 462.19 300.70 463.11 293.99 462.98 C 283.37 462.81 272.65 463.68 262.13 461.76 C 236.85 457.58 212.59 444.64 196.81 424.17 C 181.82 406.90 172.65 383.97 174.31 360.92 C 175.79 341.69 183.77 323.01 196.67 308.66 C 210.98 292.31 230.43 280.82 251.31 275.07 C 274.73 267.83 299.96 271.91 323.30 264.32 C 353.39 255.55 380.55 234.31 392.93 205.09 C 396.14 196.55 399.52 187.91 400.53 178.77 C 401.50 167.49 401.23 155.83 397.08 145.15 C 391.05 125.95 379.26 109.02 365.05 94.95 C 361.58 91.49 357.69 88.49 354.21 85.04 Z" />',
    '<path %attrs% d="M 355.45 0.00 L 358.42 0.00 C 367.89 3.10 377.29 6.44 386.30 10.72 C 413.44 22.20 438.68 38.56 459.33 59.66 C 478.17 78.72 493.20 101.68 502.28 126.93 C 507.31 140.00 509.72 153.86 512.00 167.61 L 512.00 198.44 C 509.14 222.94 501.94 247.07 489.49 268.45 C 471.85 299.35 445.32 324.77 414.71 342.72 C 383.52 361.17 348.11 372.02 312.10 375.50 C 301.83 377.34 291.38 376.96 281.00 377.00 C 257.47 377.67 233.96 369.87 215.00 356.04 C 204.82 348.59 196.79 338.70 189.45 328.56 C 178.74 312.62 172.82 293.19 174.35 273.93 C 175.90 257.66 181.87 241.79 191.72 228.72 C 206.03 209.71 226.93 196.01 249.76 189.56 C 266.95 184.09 285.12 184.26 302.90 182.59 C 331.14 179.22 358.51 165.83 377.21 144.20 C 388.38 131.47 395.43 115.63 399.43 99.29 C 401.19 91.65 401.12 83.75 400.77 75.96 C 400.36 67.21 397.07 58.99 394.05 50.88 C 385.96 30.85 371.53 14.11 355.45 0.00 Z" />',
    '<path %attrs% d="M 325.14 36.05 C 340.19 39.74 354.31 46.23 368.31 52.72 C 398.06 66.99 424.96 87.61 445.30 113.69 C 462.03 134.98 474.18 160.01 479.69 186.57 C 482.57 198.15 483.37 210.10 482.99 222.00 C 483.49 234.62 481.81 247.22 478.70 259.44 C 470.40 295.42 449.66 327.79 422.57 352.58 C 386.18 385.79 338.74 405.90 290.00 411.69 C 282.00 412.49 274.08 414.19 266.00 413.98 C 255.04 413.76 243.97 414.77 233.11 412.76 C 207.84 408.58 183.58 395.63 167.81 375.17 C 154.73 360.18 146.29 340.99 145.24 321.05 C 144.52 307.65 147.59 294.22 153.06 282.03 C 162.85 260.49 181.32 243.74 202.39 233.49 C 216.67 226.75 232.20 222.76 247.93 221.56 C 253.96 221.39 259.94 220.49 265.97 220.26 C 296.54 218.64 326.80 205.28 347.27 182.27 C 356.50 171.90 363.44 159.53 367.50 146.25 C 370.98 137.26 372.31 127.60 371.91 118.00 C 372.16 109.70 370.18 101.55 367.26 93.84 C 359.56 70.79 343.52 51.52 325.14 36.05 Z" />',
    '<path %attrs% d="M 312.14 1.08 C 322.66 3.78 332.86 7.71 342.78 12.14 C 350.68 16.00 358.91 19.15 366.66 23.33 C 375.55 27.48 383.55 33.20 392.08 38.01 C 408.38 49.41 424.70 61.12 438.42 75.64 C 460.76 98.26 479.09 124.83 492.17 153.82 C 498.05 169.63 504.49 185.37 507.63 202.02 C 509.14 208.95 509.51 216.13 512.00 222.83 L 512.00 278.16 C 508.45 289.92 507.97 302.41 503.95 314.07 C 501.22 321.76 499.61 329.84 496.27 337.31 C 493.12 344.45 490.55 351.86 486.74 358.70 C 478.84 375.30 468.38 390.53 456.98 404.91 C 450.79 413.61 442.96 420.93 435.67 428.67 C 424.76 438.87 413.40 448.66 401.05 457.10 C 392.16 463.44 383.08 469.58 373.29 474.45 C 338.42 494.43 298.96 505.49 259.19 510.04 C 257.13 510.45 255.19 511.28 253.23 512.00 L 199.75 512.00 C 194.80 510.39 189.64 509.58 184.59 508.37 C 163.65 502.41 143.63 492.27 127.66 477.34 C 120.07 469.84 112.97 461.79 107.10 452.86 C 95.85 438.01 87.93 420.52 85.05 402.06 C 82.72 392.53 83.04 382.67 83.24 372.94 C 83.42 367.14 84.69 361.45 85.91 355.79 C 87.45 349.04 88.94 342.20 91.97 335.93 C 98.00 321.92 106.13 308.73 116.62 297.62 C 123.21 290.11 130.70 283.37 139.18 278.07 C 146.90 272.91 154.55 267.48 163.38 264.34 C 177.88 257.14 193.89 253.39 209.96 251.98 C 235.46 250.78 261.88 249.43 285.39 238.45 C 298.71 232.56 311.75 225.45 322.59 215.59 C 338.76 202.30 351.60 184.99 359.67 165.68 C 362.89 158.40 364.84 150.67 367.34 143.14 C 371.04 132.18 371.40 120.46 371.12 109.00 C 370.85 97.22 367.94 85.64 363.49 74.76 C 355.65 51.84 341.99 31.16 325.16 13.85 C 321.07 9.34 316.16 5.65 312.14 1.08 Z" />',
    '<path %attrs% d="M 341.02 74.05 C 355.94 77.25 369.50 84.49 383.27 90.79 C 429.33 113.34 468.70 150.56 491.13 196.94 C 497.11 208.63 501.29 221.12 505.23 233.62 C 508.30 243.50 508.83 254.00 512.00 263.82 L 512.00 305.47 C 509.89 314.92 509.15 324.60 507.10 334.06 C 499.57 366.55 484.13 397.16 462.70 422.70 C 433.06 458.66 392.40 484.95 348.12 499.06 C 342.93 500.33 337.90 502.14 332.76 503.58 C 323.07 506.02 313.15 507.27 303.35 509.14 C 298.63 509.86 293.75 510.00 289.34 512.00 L 243.70 512.00 C 234.81 509.17 225.52 507.67 216.88 504.05 C 200.01 497.05 184.24 486.56 172.85 472.12 C 165.57 463.21 158.66 453.85 153.75 443.39 C 149.26 432.97 146.45 421.90 144.50 410.75 C 143.50 399.15 143.83 387.29 146.96 376.00 C 153.33 348.75 171.19 324.72 194.56 309.54 C 207.43 300.83 222.10 295.09 237.11 291.29 C 245.98 289.68 254.96 288.66 263.97 288.44 C 274.26 286.44 285.01 287.61 295.09 284.36 C 302.18 282.73 309.33 281.23 315.90 277.96 C 344.21 266.79 368.26 244.57 380.61 216.64 C 384.80 208.13 387.09 198.88 389.42 189.74 C 392.11 175.74 392.06 160.99 387.97 147.25 C 381.96 123.95 368.97 102.88 352.46 85.54 C 348.94 81.42 344.62 78.10 341.02 74.05 Z" />',
    '<path %attrs% d="M 273.08 30.06 C 287.22 33.08 300.15 39.78 313.16 45.82 C 362.90 69.41 404.83 110.34 426.94 161.02 C 431.42 171.26 434.91 181.92 438.05 192.64 C 440.12 201.79 441.94 211.00 443.34 220.28 C 444.39 230.15 443.81 240.09 443.98 250.00 C 444.46 262.93 441.53 275.62 439.45 288.31 C 431.15 326.36 411.64 361.69 384.84 389.86 C 354.09 422.54 313.88 445.95 270.68 457.80 C 254.50 462.82 237.52 464.38 220.92 467.44 C 209.64 468.32 198.31 467.83 187.00 467.98 C 173.57 468.33 160.51 464.34 148.03 459.77 C 133.05 453.29 118.92 444.25 108.05 431.95 C 99.86 422.26 92.00 412.13 86.38 400.70 C 81.64 390.45 78.84 379.45 76.76 368.39 C 73.47 342.63 80.82 315.97 95.90 294.93 C 117.28 264.85 153.35 246.43 190.00 244.66 C 197.05 244.62 203.96 243.03 211.01 242.92 C 219.97 242.70 228.52 239.89 237.19 237.96 C 240.37 237.17 243.37 235.84 246.37 234.56 C 274.36 223.86 298.51 202.57 311.34 175.33 C 321.69 153.70 326.94 128.46 320.43 104.90 C 316.89 92.06 312.13 79.40 304.90 68.14 C 296.92 54.90 286.76 43.04 275.40 32.59 C 274.59 31.78 273.82 30.93 273.08 30.06 Z" />',
    '<path %attrs% d="M 270.09 70.17 C 275.93 71.69 281.48 74.08 287.21 75.94 C 310.54 85.89 333.42 97.64 352.95 114.04 C 393.68 147.04 421.98 196.29 425.93 248.93 C 425.96 260.57 426.26 272.23 425.75 283.85 C 424.27 294.46 423.01 305.20 419.60 315.41 C 409.89 350.76 389.30 382.66 362.53 407.54 C 341.48 426.78 316.69 441.80 290.10 452.05 C 271.33 458.67 252.02 463.99 232.19 466.12 C 221.30 468.63 210.07 467.71 199.00 467.92 C 170.86 469.03 142.66 457.00 123.27 436.72 C 112.50 424.44 102.33 410.90 97.85 394.95 C 95.11 386.91 93.58 378.47 92.86 370.02 C 92.20 348.37 99.24 326.58 112.33 309.32 C 132.60 282.01 166.27 266.01 200.06 265.50 C 211.48 263.86 223.20 263.83 234.35 260.59 C 252.45 256.00 269.47 246.91 283.15 234.16 C 295.34 223.02 304.49 208.78 310.25 193.34 C 311.85 188.58 313.22 183.75 314.68 178.95 C 317.20 170.17 316.80 160.97 316.70 151.94 C 316.63 144.67 313.97 137.80 312.06 130.88 C 304.44 107.05 288.80 86.48 270.09 70.17 Z" />',
  ];
}
