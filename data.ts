import { Chapter } from './types';

export const textbookData: Chapter[] = [
  {
    id: "c1",
    title: "Chương 1: Số Hữu Tỉ",
    lessons: [
      {
        id: "c1-l1",
        title: "Bài 1: Tập hợp các số hữu tỉ",
        summary: [
          "Số hữu tỉ là số viết được dưới dạng phân số $\\frac{a}{b}$ với $a, b \\in \\mathbb{Z}, b \\neq 0$.",
          "Tập hợp các số hữu tỉ được kí hiệu là $\\mathbb{Q}$.",
          "Mỗi số nguyên là một số hữu tỉ: $\\mathbb{Z} \\subset \\mathbb{Q}$.",
          "Trên trục số, điểm biểu diễn số hữu tỉ $x$ được gọi là điểm $x$.",
          "So sánh hai số hữu tỉ $x, y$: Luôn có $x = y$ hoặc $x < y$ hoặc $x > y$.",
          "Để so sánh hai số hữu tỉ, ta thường đưa về so sánh hai phân số cùng mẫu dương."
        ],
        examples: [
          {
            id: "exm-1",
            title: "Nhận biết số hữu tỉ",
            content: "Các số sau có phải là số hữu tỉ không: $3; -0,5; 0; 2\\frac{5}{7}$?",
            explanation: "Tất cả đều là số hữu tỉ vì chúng viết được dưới dạng phân số:\n$3 = \\frac{3}{1}$\n$-0,5 = \\frac{-1}{2}$\n$0 = \\frac{0}{1}$\n$2\\frac{5}{7} = \\frac{19}{7}$"
          },
          {
            id: "exm-2",
            title: "So sánh số hữu tỉ",
            content: "So sánh hai số hữu tỉ: $x = -0,6$ và $y = \\frac{1}{-2}$",
            explanation: "Ta viết $x, y$ dưới dạng phân số có mẫu dương:\n$x = -0,6 = \\frac{-6}{10} = \\frac{-3}{5}$\n$y = \\frac{1}{-2} = \\frac{-1}{2} = \\frac{-2,5}{5}$ (Cách này khó so sánh tử). \n\nQuy đồng mẫu số chung là $10$:\n$x = \\frac{-6}{10}$\n$y = \\frac{-5}{10}$\nVì $-6 < -5$ nên $\\frac{-6}{10} < \\frac{-5}{10}$. Vậy $x < y$."
          }
        ],
        exercises: [
          {
            id: "ex-1",
            question: "Điền kí hiệu $\\in, \\notin$ thích hợp: $-5 \\dots \\mathbb{N}$; $-5 \\dots \\mathbb{Z}$; $-5 \\dots \\mathbb{Q}$; $-\\frac{3}{7} \\dots \\mathbb{Z}$; $-\\frac{3}{7} \\dots \\mathbb{Q}$.",
            solution: "$-5 \\notin \\mathbb{N}$ (Số âm)\n$-5 \\in \\mathbb{Z}$ (Số nguyên)\n$-5 \\in \\mathbb{Q}$ (Số hữu tỉ)\n$-\\frac{3}{7} \\notin \\mathbb{Z}$ (Phân số không nguyên)\n$-\\frac{3}{7} \\in \\mathbb{Q}$ (Số hữu tỉ)"
          },
          {
            id: "ex-2",
            question: "Trong các phân số sau, những phân số nào biểu diễn số hữu tỉ $\\frac{-5}{9}$: $\\frac{-10}{18}; \\frac{10}{18}; \\frac{15}{-27}; -\\frac{20}{36}$?",
            solution: "Rút gọn các phân số:\n$\\frac{-10}{18} = \\frac{-5}{9}$ (Đúng)\n$\\frac{10}{18} = \\frac{5}{9} \\neq \\frac{-5}{9}$ (Sai)\n$\\frac{15}{-27} = \\frac{5}{-9} = \\frac{-5}{9}$ (Đúng)\n$-\\frac{20}{36} = -\\frac{5}{9} = \\frac{-5}{9}$ (Đúng)\nVậy có 3 phân số thỏa mãn."
          }
        ],
        quizzes: [
          {
            id: "q1",
            question: "Khẳng định nào sau đây là **SAI**?",
            options: [
              "Tập hợp số hữu tỉ kí hiệu là $\\mathbb{Q}$.",
              "Số $0$ không phải là số hữu tỉ.",
              "Số nguyên $a$ cũng là số hữu tỉ.",
              "Số hữu tỉ viết được dưới dạng $\\frac{a}{b}$ với $a,b \\in \\mathbb{Z}, b \\ne 0$."
            ],
            correctAnswerIndex: 1,
            explanation: "Số 0 là số hữu tỉ vì $0 = \\frac{0}{1}$. Vậy khẳng định sai là 'Số 0 không phải là số hữu tỉ'."
          },
          {
            id: "q2",
            question: "Số nào sau đây **không phải** là số hữu tỉ?",
            options: [
              "$-5$",
              "$0,25$",
              "$2\\frac{1}{3}$",
              "$\\frac{3}{0}$"
            ],
            correctAnswerIndex: 3,
            explanation: "Phân số $\\frac{a}{b}$ yêu cầu $b \\ne 0$. Do đó $\\frac{3}{0}$ không xác định và không phải số hữu tỉ."
          },
          {
             id: "q3",
             question: "So sánh $x = \\frac{2}{-7}$ và $y = \\frac{-3}{11}$.",
             options: [
               "$x > y$",
               "$x < y$",
               "$x = y$",
               "Không so sánh được"
             ],
             correctAnswerIndex: 1,
             explanation: "$x = \\frac{-2}{7} = \\frac{-22}{77}$. $y = \\frac{-3}{11} = \\frac{-21}{77}$. Vì $-22 < -21$ nên $x < y$."
          }
        ]
      },
      {
        id: "c1-l2",
        title: "Bài 2: Các phép tính với số hữu tỉ",
        summary: [
          "Cộng/Trừ: Viết về dạng phân số cùng mẫu dương rồi thực hiện tử cộng/trừ tử, mẫu giữ nguyên.",
          "Nhân: $\\frac{a}{b} \\cdot \\frac{c}{d} = \\frac{a \\cdot c}{b \\cdot d}$",
          "Chia: $\\frac{a}{b} : \\frac{c}{d} = \\frac{a}{b} \\cdot \\frac{d}{c} = \\frac{a \\cdot d}{b \\cdot c}$ ($c \\neq 0$)",
          "Tính chất phân phối: $x(y+z) = xy + xz$"
        ],
        examples: [
            {
                id: "exm-1",
                title: "Thực hiện phép tính hợp lí",
                content: "Tính: $A = \\frac{3}{7} \\cdot (-\\frac{2}{5}) \\cdot 2\\frac{1}{3} \\cdot 20 \\cdot \\frac{19}{72}$",
                explanation: "Quan sát bài toán để nhóm hợp lí (nếu có). Trong trường hợp này ta tính tuần tự hoặc đổi hỗn số:\n$A = \\frac{3}{7} \\cdot \\frac{-2}{5} \\cdot \\frac{7}{3} \\cdot 20 \\cdot \\frac{19}{72}$\nSử dụng tính chất giao hoán:\n$A = (\\frac{3}{7} \\cdot \\frac{7}{3}) \\cdot (\\frac{-2}{5} \\cdot 20) \\cdot \\frac{19}{72}$\n$A = 1 \\cdot (-8) \\cdot \\frac{19}{72} = -8 \\cdot \\frac{19}{72} = -\\frac{19}{9}$"
            }
        ],
        exercises: [
          {
            id: "ex-1",
            question: "Tính: $\\frac{-2}{3} + \\frac{3}{4} - (-\\frac{1}{6})$",
            solution: "Mẫu chung là 12.\n$\\frac{-8}{12} + \\frac{9}{12} + \\frac{2}{12} = \\frac{-8+9+2}{12} = \\frac{3}{12} = \\frac{1}{4}$."
          },
          {
             id: "ex-2",
             question: "Tìm x, biết: $x - \\frac{1}{2} = -\\frac{2}{3}$",
             solution: "$x = -\\frac{2}{3} + \\frac{1}{2} = \\frac{-4}{6} + \\frac{3}{6} = \\frac{-1}{6}$."
          }
        ],
        quizzes: [
           {
            id: "q1",
            question: "Kết quả của phép tính $\\frac{-3}{4} + \\frac{1}{2}$ là:",
            options: [
              "$\\frac{-1}{4}$",
              "$\\frac{-5}{4}$",
              "$\\frac{1}{4}$",
              "$\\frac{-2}{6}$"
            ],
            correctAnswerIndex: 0,
            explanation: "$\\frac{-3}{4} + \\frac{2}{4} = \\frac{-1}{4}$."
          },
          {
            id: "q2",
            question: "Tìm $x$ biết: $x : \\frac{2}{3} = \\frac{-9}{8}$",
            options: [
              "$x = \\frac{-3}{4}$",
              "$x = \\frac{-27}{16}$",
              "$x = \\frac{-3}{2}$",
              "$x = \\frac{-18}{24}$"
            ],
            correctAnswerIndex: 0,
            explanation: "$x = \\frac{-9}{8} \\cdot \\frac{2}{3} = \\frac{-18}{24} = \\frac{-3}{4}$."
          }
        ]
      },
      {
        id: "c1-l3",
        title: "Bài 3: Luỹ thừa của một số hữu tỉ",
        summary: [
          "Luỹ thừa bậc n: $x^n = x \\cdot x \\dots x$ (n lần).",
          "Tích hai luỹ thừa cùng cơ số: $x^m \\cdot x^n = x^{m+n}$.",
          "Thương hai luỹ thừa cùng cơ số: $x^m : x^n = x^{m-n}$ ($x \\neq 0, m \\geq n$).",
          "Luỹ thừa của luỹ thừa: $(x^m)^n = x^{m \\cdot n}$.",
          "Luỹ thừa của một tích: $(x \\cdot y)^n = x^n \\cdot y^n$.",
          "Luỹ thừa của một thương: $(\\frac{x}{y})^n = \\frac{x^n}{y^n}$ ($y \\neq 0$)."
        ],
        examples: [
            {
                id: "exm-1",
                title: "Tính giá trị luỹ thừa",
                content: "Tính: $(-0,5)^2; (\\frac{3}{4})^0; (2^2)^3$",
                explanation: "$(-0,5)^2 = (-0,5) \\cdot (-0,5) = 0,25$\n$(\\frac{3}{4})^0 = 1$\n$(2^2)^3 = 2^{2 \\cdot 3} = 2^6 = 64$"
            }
        ],
        exercises: [
          {
            id: "ex-1",
            question: "Viết số $25^4$ dưới dạng luỹ thừa cơ số 5.",
            solution: "Ta có $25 = 5^2$. \nVậy $25^4 = (5^2)^4 = 5^{2 \\cdot 4} = 5^8$."
          }
        ],
        quizzes: [
          {
            id: "q1",
            question: "Kết quả của $(-\\frac{1}{2})^3$ là:",
            options: [
              "$\\frac{1}{8}$",
              "$\\frac{-1}{8}$",
              "$\\frac{-1}{6}$",
              "$\\frac{1}{6}$"
            ],
            correctAnswerIndex: 1,
            explanation: "Mũ lẻ giữ nguyên dấu âm. $\\frac{(-1)^3}{2^3} = \\frac{-1}{8}$."
          },
          {
            id: "q2",
            question: "Viết biểu thức $3^4 \\cdot 3^5$ dưới dạng một luỹ thừa:",
            options: [
              "$3^{20}$",
              "$9^9$",
              "$3^9$",
              "$9^{20}$"
            ],
            correctAnswerIndex: 2,
            explanation: "$x^m \\cdot x^n = x^{m+n} \\Rightarrow 3^{4+5} = 3^9$."
          }
        ]
      },
      {
        id: "c1-l4",
        title: "Bài 4: Quy tắc dấu ngoặc và chuyển vế",
        summary: [
          "Khi bỏ dấu ngoặc có dấu \"-\" đằng trước, ta đổi dấu các số hạng trong ngoặc: $-(a - b + c) = -a + b - c$.",
          "Khi chuyển vế một số hạng, ta đổi dấu số hạng đó: $x + y = z \\Rightarrow x = z - y$."
        ],
        examples: [],
        exercises: [
          {
            id: "ex-1",
            question: "Tìm x: $\\frac{3}{4} - (x - \\frac{1}{2}) = 1\\frac{2}{3}$",
            solution: "$\\frac{3}{4} - x + \\frac{1}{2} = \\frac{5}{3}$\n$\\frac{3}{4} + \\frac{2}{4} - x = \\frac{5}{3}$\n$\\frac{5}{4} - x = \\frac{5}{3}$\n$x = \\frac{5}{4} - \\frac{5}{3} = \\frac{15 - 20}{12} = \\frac{-5}{12}$"
          }
        ],
        quizzes: [
            {
                id: "q1",
                question: "Bỏ dấu ngoặc biểu thức $-(a - b + c)$ ta được:",
                options: [
                    "$-a - b + c$",
                    "$-a + b - c$",
                    "$a - b + c$",
                    "$-a + b + c$"
                ],
                correctAnswerIndex: 1,
                explanation: "Dấu trừ trước ngoặc đổi dấu toàn bộ số hạng bên trong: $a \\to -a$, $-b \\to +b$, $+c \\to -c$."
            }
        ]
      }
    ]
  },
  {
    id: "c2",
    title: "Chương 2: Số Thực",
    lessons: [
      {
        id: "c2-l1",
        title: "Bài 1: Số vô tỉ. Căn bậc hai số học",
        summary: [
          "Số vô tỉ là số viết được dưới dạng số thập phân vô hạn không tuần hoàn.",
          "Căn bậc hai số học của $a \\geq 0$, kí hiệu $\\sqrt{a}$, là số $x \\geq 0$ sao cho $x^2 = a$.",
          "Làm tròn số: Nếu chữ số đầu tiên bỏ đi nhỏ hơn 5 thì giữ nguyên bộ phận còn lại. Nếu lớn hơn hoặc bằng 5 thì cộng thêm 1 vào chữ số cuối cùng của bộ phận còn lại."
        ],
        examples: [
            {
                id: "exm-1",
                title: "Tính căn bậc hai",
                content: "Tính $\\sqrt{0,09}$ và $\\sqrt{(-5)^2}$",
                explanation: "$\\sqrt{0,09} = 0,3$ vì $0,3 > 0$ và $(0,3)^2 = 0,09$.\n$\\sqrt{(-5)^2} = \\sqrt{25} = 5$ (Lưu ý: kết quả căn bậc hai số học luôn không âm)."
            }
        ],
        exercises: [
          {
            id: "ex-1",
            question: "So sánh $\\sqrt{2}$ và $1,42$",
            solution: "Ta có $(1,42)^2 = 2,0164 > 2$. \nHoặc dùng máy tính $\\sqrt{2} \\approx 1,4142... < 1,42$. \nVậy $\\sqrt{2} < 1,42$."
          }
        ],
        quizzes: [
            {
                id: "q1",
                question: "Căn bậc hai số học của 16 là:",
                options: ["4", "-4", "±4", "256"],
                correctAnswerIndex: 0,
                explanation: "Căn bậc hai số học luôn không âm. $\\sqrt{16} = 4$."
            }
        ]
      },
      {
        id: "c2-l2",
        title: "Bài 2: Số thực. Giá trị tuyệt đối",
        summary: [
          "$\\mathbb{R} = \\mathbb{Q} \\cup \\mathbb{I}$.",
          "$|x| = x$ nếu $x \\geq 0$; $|x| = -x$ nếu $x < 0$."
        ],
        examples: [],
        exercises: [
          {
            id: "ex-1",
            question: "Tìm $x$ biết $|x - 1| = 2$",
            solution: "Trường hợp 1: $x - 1 = 2 \\Rightarrow x = 3$.\nTrường hợp 2: $x - 1 = -2 \\Rightarrow x = -1$.\nVậy $x \\in \\{3; -1\\}$."
          }
        ],
        quizzes: [
             {
                id: "q1",
                question: "Giá trị tuyệt đối của -3,5 là:",
                options: ["-3,5", "3,5", "0", "7"],
                correctAnswerIndex: 1,
                explanation: "$|-3,5| = 3,5$."
            }
        ]
      }
    ]
  },
  {
    id: "c3",
    title: "Chương 3: Hình khối thực tiễn",
    lessons: [
      {
        id: "c3-l1",
        title: "Bài 1: Hình hộp chữ nhật - Hình lập phương",
        summary: [
          "Hình hộp chữ nhật: 6 mặt chữ nhật.",
          "Hình lập phương: 6 mặt hình vuông."
        ],
        examples: [],
        exercises: [
            {
                id: "ex-1",
                question: "Một hình lập phương có diện tích toàn phần là $150 cm^2$. Tính cạnh của nó.",
                solution: "Diện tích toàn phần $S_{tp} = 6a^2 = 150 \\Rightarrow a^2 = 25 \\Rightarrow a = 5 (cm)$."
            }
        ],
        quizzes: [
             {
                id: "q1",
                question: "Hình lập phương có bao nhiêu đỉnh?",
                options: ["4", "6", "8", "12"],
                correctAnswerIndex: 2,
                explanation: "Hình lập phương có 8 đỉnh, 6 mặt, 12 cạnh."
            }
        ]
      },
      {
        id: "c3-l2",
        title: "Bài 2: Diện tích & Thể tích",
        summary: [
            "$S_{xq (HHCN)} = 2(a+b)h$",
            "$V_{HHCN} = abh$",
            "$S_{xq (HLP)} = 4a^2$",
            "$V_{HLP} = a^3$"
        ],
        examples: [
             {
                id: "exm-1",
                title: "Tính thể tích bể nước",
                content: "Một bể nước hình hộp chữ nhật có dài 2m, rộng 1.5m, cao 1m. Tính thể tích nước chứa đầy bể.",
                explanation: "$V = 2 \\cdot 1,5 \\cdot 1 = 3 (m^3)$.\nĐổi ra lít: $3 m^3 = 3000$ lít."
            }
        ],
        exercises: [
            {
                id: "ex-1",
                question: "Tính thể tích hình hộp chữ nhật có dài $4cm$, rộng $3cm$, cao $5cm$.",
                solution: "$V = 4 \\cdot 3 \\cdot 5 = 60 (cm^3)$."
            }
        ],
        quizzes: [
             {
                id: "q1",
                question: "Công thức tính thể tích hình hộp chữ nhật là:",
                options: ["$V = a.b$", "$V = a.b.h$", "$V = a^3$", "$V = 2(a+b).h$"],
                correctAnswerIndex: 1,
                explanation: "Thể tích bằng dài nhân rộng nhân cao."
            }
        ]
      }
    ]
  },
  {
    id: "c4",
    title: "Chương 4: Góc & Đường thẳng song song",
    lessons: [
      {
        id: "c4-l1",
        title: "Bài 1: Các góc ở vị trí đặc biệt",
        summary: [
          "Góc kề bù: Tổng = $180^\\circ$.",
          "Góc đối đỉnh: Bằng nhau."
        ],
        examples: [],
        exercises: [],
        quizzes: []
      },
      {
        id: "c4-l2",
        title: "Bài 2: Tia phân giác",
        summary: [
          "Tia phân giác chia góc thành 2 góc bằng nhau."
        ],
        examples: [],
        exercises: [],
        quizzes: []
      }
    ]
  },
  {
    id: "c5",
    title: "Chương 5: Một số yếu tố thống kê",
    lessons: [
      {
        id: "c5-l1",
        title: "Bài 1: Thu thập và phân loại dữ liệu",
        summary: [
          "Dữ liệu định lượng (số).",
          "Dữ liệu định tính (chữ)."
        ],
        examples: [],
        exercises: [],
        quizzes: []
      }
    ]
  }
];