$ (function () {
    console.log(window.innerWidth)
    $("#results").hide();

        var choices= ["Pierre", "Feuille", "Ciseaux"];
        var player= '';
        var pierre = choices[0];
        var feuille = choices[1];
        var ciseaux = choices[2];
        var victory= 0;
        //var defeat= 0;
        var playerVictory= 0;
        var machineVictory=0;
        var games= 0;
        

        function gifWin() {
            var win = ['#banana', '#dance', '#winner'];
            //console.table(win);
            var machineWin = win[Math.floor(Math.random() * win.length)];
            //console.log(machineWin);
            $(machineWin).show();
            setTimeout(function(){ $(machineWin).hide(); }, 4000);
        }
    
        function gifLoose() {
            var loose = ['#godzilla', '#looser', '#geisha', '#bot', '#shook'];
            //console.table(loose);
            var machineLoose = loose[Math.floor(Math.random() * loose.length)];
            //console.log(machineLoose);
            $(machineLoose).show();
            setTimeout(function(){ $(machineLoose).hide(); }, 4000);
        }


        $( ".draggable" ).draggable({
            revert: true
        });

            $('#pierre').mousedown(function(){
                player = pierre;
            });
            $('#feuille').mousedown(function(){
                player = feuille;
            });
            $('#ciseaux').mousedown(function(){
                player = ciseaux;
            });
            
        $( ".droppable" ).droppable({
            accept: ".sign",
            drop: function(event, ui){
                $(".droppableMachine").html();
                games++;
                var machine= choices[Math.floor(Math.random() * choices.length)];
                console.log(machine);
                if (machine == pierre){
                    $(".droppableMachine").html(('<img class="img mx-auto d-block" src="assets/img/rock.png">'));
                } else if (machine == feuille) {
                    $(".droppableMachine").html(('<img class="img mx-auto d-block" src="assets/img/feuille.png">'));
                } else {
                    $(".droppableMachine").html(('<img class="img mx-auto d-block" src="assets/img/victory.png">'));
                }
                console.log(`Player : ${player} / PC : ${machine}`);
                if (player == machine) {
                    var msg ="Égalité !";
                    gifLoose() 
                } else if ((player == pierre && machine == ciseaux) || (player == feuille && machine == pierre) || (player == ciseaux && machine == feuille)) {
                    var msg ="Gagné !! ";
                    gifWin()
                    victory++;
                    playerVictory++;
                } else {
                    var msg ="Perdu !";
                    gifLoose()
                    //defeat++;
                    machineVictory++;
                }

                
                $(".playerVictory").html("Human: " + playerVictory)
                $(".machineVictory").html("Machine: " + machineVictory)
                
                var percent= Math.round((playerVictory * 100) / games);
                $(".percent").html(percent + '%');
                $(".victory").html(victory);

                alert(msg);

                //$(".droppableMachine").empty(); 
                //games = 5;
                //playerVictory = 0; //force le joueur à perdre

                if (games==5){
                    $(".jeu").hide();
                    $(".footer").hide();
                    $("#results").show();

                    if (playerVictory == 0 ) {
                        $('#finalResult').html( 'PERDU... </br> <a href="https://www.youtube.com/watch?v=v7ScGV5128A">TA RÉCOMPENSE ICI 🎁 </a> </br>' + playerVictory + ' victoire(s) sur ' + games +' parties.');
                    }

                    else {
                        if (percent >= 0 && percent < 50) {
                            $('#finalResult').html('PERDU... </br>'+ playerVictory + ' victoire(s) sur ' + games +' parties.');
                        } else if (percent == 50) {
                            $('#finalResult').html('ÉGALITÉ ! </br>' + playerVictory + ' victoire(s) sur ' + games +' parties.');
                        }else if (percent >= 51 && percent <= 100) {
                            $('#finalResult').html('GAGNÉ ! </br>' + playerVictory + ' victoire(s) sur ' + games +' parties.');
                        } 
                    }
                } 

            } 
            
            }) 
            
})
