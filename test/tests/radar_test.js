define(['radar'], function(radar) {

  var holdA = {"name": "Hold A", "loc": 3.6, "movement": "c"};
  var holdB = {"name": "Hold B", "loc": 3.5, "movement": "c"};

  var assessA = {"name": "Assess A", "loc": 2.6, "movement": "c"};

  var adoptA = {"name": "Adopt A", "loc": 0.2, "movement": "c"};
  var adoptB = {"name": "Adopt B", "loc": 0.7, "movement": "c"};

  var standardRings = [
             {'r':100,'name':'Adopt'}
            ,{'r':200,'name':'Trial'}
            ,{'r':300,'name':'Assess'}
            ,{'r':400,'name':'Hold'}
          ];

  var createEntry = function(name, loc, mov) {
    return {"name": name,
      "loc": loc,
      "movement": mov
    };
  };

  var createSection = function(name, color, items) {
    return {"name": name,
      "color": color,
      "items": items};
  };

  // TODO The names of these seem really wrong
  describe("Radar", function() {
    describe("ring grouping", function() {
      it("by same ring data", function() {
        // create test data

        var testEntry = createEntry("Test", 2.3, "c");

        var secA = createSection('Section A', "red", [holdA, holdB, assessA, adoptA, adoptB]);
        var secB = createSection('Section B', "black", [testEntry]);

        var testData = {
          rings : standardRings,
          sections : [
            secA,
            secB
          ]};

        // send through bucketing function

        var nestedData = radar.nestDataByRing(testData);

        var expectedDataA =
            {
              "0": [{
                  "name": adoptA.name,
                  "loc": adoptA.loc,
                  "movement": adoptA.movement
                },  {
                  "name": adoptB.name,
                  "loc": adoptB.loc,
                  "movement": adoptB.movement
                }],
              "2": [{
                "name": assessA.name,
                "loc": assessA.loc,
                "movement": assessA.movement
                }],
              "3": [{
                  "name": holdA.name,
                  "loc": holdA.loc,
                  "movement": holdA.movement
                }, {
                  "name": holdB.name,
                  "loc": holdB.loc,
                  "movement": holdB.movement
                }]
              };

        var expectedDataB =
            {
              "2": [{
                  "name": testEntry.name,
                  "loc": testEntry.loc,
                  "movement": testEntry.movement
                }]};

        // assert data comes out in buckets appropriately
        expect(expectedDataA).to.eql(nestedData.sections[0].rings);
        expect(expectedDataB).to.eql(nestedData.sections[1].rings);
      });

      describe("section bounds", function() {
        it("when no data", function() {
          // create test data
          var testData = {
            rings: standardRings,
            sections: []
          };

          // compute radii bounds
          var computedBounds = radar.computeBounds(testData);

          // assert location is correct
          expect(testData).to.eql(computedBounds);
        });

        it("when single section", function() {
          // create test data
          var testData = {
            rings: standardRings,
            sections: [
              createSection('Single', '', [holdA])
            ]
          };

          // compute radii bounds
          var computedData = radar.computeBounds(testData);

          var singleSection = createSection('Single', '', [holdA]);
          singleSection.bounds = {
            'start': 0,
            'width': 2*Math.PI
          };

          var expectedData = {
            rings: standardRings,
            sections: [
              singleSection
            ]
          };

          // assert location is correct
          expect(expectedData).to.eql(computedData);
        });

        it("when multiple sections", function() {
          // create test data
          var testData = {
            rings: standardRings,
            sections: [
              createSection('Section A', '', [holdA]),
              createSection('Section B', '', [holdA]),
              createSection('Section C', '', [holdA]),
              createSection('Section D', '', [holdA]),
              createSection('Section E', '', [holdA]),
              createSection('Section F', '', [holdA])
            ]
          }

          // compute radii bounds
          var computedBounds = radar.computeBounds(testData);
          var expectedWidth = (2*Math.PI)/6;

          // assert the bounds are correct
          for(var section in testData.sections) {
            expect({'start': section*expectedWidth, 'width': expectedWidth})
              .to
              .eql(computedBounds.sections[section].bounds);
          }
        });
      });
    });

    describe("space points", function () {
      it("in same ring", function() {
        // create test data
        var testSection = createSection("section", "red", {
          "3": [
            holdA,
            holdB
          ]
        });

        testSection.bounds = {
          'start': 0,
          'width': 2*Math.PI
        };

        // space points
        var spacedData = radar.spaceSection(testSection);

        // assert points are properly spaces
      });
    });

    describe("convert points", function() {
      // TODO insert additional describe here
      it("Convert ring location to radius", function() {
        // create test data
        // send through location conversion
        // assert location is correct
      });
    });
  });
})
